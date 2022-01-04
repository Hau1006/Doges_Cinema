import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import {
    isRequired,
    minLength,
    validateOneElement,
} from "../../../utils/validator"; //isPassword,
import callApi from "../../../apis/callApi";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import jwt_decode from 'jwt-decode'

function Login() {
    const [dataForm, setDataForm] = useState({
        taiKhoan: "",
        matKhau: "",
    });
    const [msgError, setMsgError] = useState({
        taiKhoan: "",
        matKhau: "",
    });
    const formRef = useRef({});
    const navigate = useNavigate()

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("userInfo"))
        if (data) {
            let decodedToken = jwt_decode(data.accessToken)
            console.log("Decoded Token", decodedToken);
            let currentDate = new Date();

            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                console.log("Token expired.");
                localStorage.removeItem("userInfo")
            } else {
                if (data.maLoaiNguoiDung === 'QuanTri') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const ruleList = {
        taiKhoan: [isRequired()],
        matKhau: [isRequired(), minLength(6)], //, isPassword()
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        let flag = true;
        const msg = {};
        for (const [key, value] of Object.entries(ruleList)) {
            // console.log(formRef.current[key], value);
            const res = validateOneElement(formRef.current[key], value);
            if (res) flag = false;
            msg[key] = res ?? "";
        }
        if (flag) {
            //Call API
            const res = await callApi("QuanLyNguoiDung/DangNhap", "POST", dataForm);
            // const resUser = await callApi(
            //     "QuanLyNguoiDung/ThongTinTaiKhoan",
            //     "POST",
            //     userName
            // );
            if (res?.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                // localStorage.setItem("userInfo2", JSON.stringify(resUser.data));
                if (res.data.maLoaiNguoiDung === "KhachHang") {
                    navigate("/");
                } else {
                    navigate("/admin");
                }
                notification.open({
                    message: "Thông báo",
                    description: "Đăng nhập thành công",
                });
            } else {
                notification.open({
                    message: "Thông báo",
                    description: res.response.data,
                });
            }
        }
    };
    const handleBlur = (e) => {
        const res =
            validateOneElement(
                formRef.current[e.target.name],
                ruleList[e.target.name]
            ) ?? "";
        setMsgError({ ...msgError, [e.target.name]: res });
    };
    const hanldeChange = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    };
    const handleInput = (e) => {
        const parentElement = e.target.parentElement;
        if (parentElement.classList.contains("invalid")) {
            parentElement.classList.remove("invalid");
        }
        setMsgError({ ...msgError, [e.target.name]: "" });
    };
    return (
        <div className={style.logn_page}>
            <div className={style.block_login}>
                <div className={style.header_login}>
                    <h1 style={{ color: "green", fontSize: "20px" }}>HELLO</h1>
                    <h1 style={{ fontSize: "22px" }}>WELCOME BACK</h1>
                </div>
                <form id={style.form} onSubmit={handleSubmit}>
                    <div className={style.form_group}>
                        <label style={{ fontSize: "16px" }} htmlFor="taiKhoan">
                            Username <small className={style.text_danger}>*</small>
                        </label>
                        <input
                            type="text"
                            name="taiKhoan"
                            id="taiKhoan"
                            className={style.form_control}
                            placeholder="Enter username"
                            value={dataForm.taiKhoan}
                            onChange={hanldeChange}
                            onBlur={handleBlur}
                            onInput={handleInput}
                            ref={(el) => (formRef.current.taiKhoan = el)}
                        />
                        <small className={style.text_danger}>{msgError.taiKhoan}</small>
                    </div>
                    <div className={style.form_group}>
                        <label style={{ fontSize: "16px" }} htmlFor="matKhau">
                            Password <small className={style.text_danger}>*</small>
                        </label>
                        <input
                            type="password"
                            name="matKhau"
                            id="matKhau"
                            className={style.form_control}
                            placeholder="Enter password"
                            value={dataForm.matKhau}
                            onChange={hanldeChange}
                            onBlur={handleBlur}
                            onInput={handleInput}
                            ref={(el) => (formRef.current.matKhau = el)}
                        />
                        <small className={style.text_danger}>{msgError.matKhau}</small>
                    </div>
                    <div className={`${style.option_forgot} ${style.flex_end}`}>
                        <Link to="/#">Forget password</Link>
                    </div>
                    <div className={style.div_button}>
                        <button>SIGN IN</button>
                    </div>
                    <div style={{ color: "white" }} className={`${style.flex_center}`}>
                        Don't have an account?&nbsp; <Link to="/sign-up">Sign up now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
