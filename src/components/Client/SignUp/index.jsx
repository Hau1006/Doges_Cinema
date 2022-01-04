import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../../Common/SignIn/style.module.css'
import { isRequired, minLength, isPassword, validateOneElement, isEmail, isConfirmPaswword, isPhoneNumber } from '../../../utils/validator'
import callApi from '../../../apis/callApi'
import { notification } from 'antd'

function SignUp() {
    const [dataForm, setDataForm] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        xacNhanMatKhau: "",
        hoten: "",
        soDt: "",
        maLoaiNguoiDung: "KhachHang",
        maNhom: "GP02"
    })
    const [msgError, setMsgError] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        xacNhanMatKhau: "",
        hoten: "",
        soDt: "",
    })
    const navigate = useNavigate()
    const formRef = useRef({})

    const ruleList = {
        taiKhoan: [isRequired()],
        email: [isRequired(), isEmail()],
        matKhau: [isRequired(), minLength(6), isPassword()],
        xacNhanMatKhau: [isRequired(), minLength(6), isConfirmPaswword(dataForm.matKhau)],
        hoten: [isRequired()],
        soDt: [isRequired(), isPhoneNumber()],
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let flag = true
        const msg = {}
        for (const [key, value] of Object.entries(ruleList)) {
            // console.log(formRef.current[key], value);
            const res = validateOneElement(formRef.current[key], value)
            if (res) flag = false
            msg[key] = res ?? ""
        }

        setMsgError(msg)
        if (flag) {
            //Call API
            console.log(JSON.stringify(dataForm));
            const res = await callApi("QuanLyNguoiDung/DangKy", "POST", dataForm)
            if (res?.status === 200) {
                navigate("/sign-in")
                notification.open({
                    message: "Thông báo",
                    description:
                        "Đăng Ký tài khoản thành công",
                });
            } else {
                notification.open({
                    message: "Thông báo",
                    description:
                        res.response.data,
                });
            }
        }
    }

    const handleBlur = e => {
        const res = validateOneElement(formRef.current[e.target.name], ruleList[e.target.name]) ?? ""
        setMsgError({ ...msgError, [e.target.name]: res })
    }

    const hanldeChange = e => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    const handleInput = e => {
        const parentElement = e.target.parentElement
        if (parentElement.classList.contains("invalid")) {
            parentElement.classList.remove("invalid")
        }
        setMsgError({ ...msgError, [e.target.name]: "" })
    }

    return (
        <div className={style.logn_page}>
            <div className={style.block_login}>
                <div className={style.header_login}>
                    <h1 style={{ color: "green", fontSize: "20px" }}>WELCOME</h1>
                    <h1 style={{ fontSize: "22px" }}>TO SEE MOVIE</h1>
                </div>
                <form id={style.form} onSubmit={handleSubmit}>
                    <div className={style.form_group}>
                        <label style={{ fontSize: "16px" }} htmlFor="taiKhoan">Username <small className={style.text_danger}>*</small></label>
                        <input type="text" name="taiKhoan" id="taiKhoan" className={style.form_control}
                            placeholder="Enter username"
                            value={dataForm.taiKhoan}
                            onChange={hanldeChange}
                            onBlur={handleBlur}
                            onInput={handleInput}
                            ref={el => formRef.current.taiKhoan = el} />
                        <small className={style.text_danger}>{msgError.taiKhoan}</small>
                    </div>

                    <div className={style.form_group}>
                        <label style={{ fontSize: "16px" }} htmlFor="hoten">Họ và tên <small className={style.text_danger}>*</small></label>
                        <input type="text" name="hoten" id="hoten" className={style.form_control}
                            placeholder="Enter username"
                            value={dataForm.hoten}
                            onChange={hanldeChange}
                            onBlur={handleBlur}
                            onInput={handleInput}
                            ref={el => formRef.current.hoten = el} />
                        <small className={style.text_danger}>{msgError.hoten}</small>
                    </div>

                    <div className={style.form_group}>
                        <label style={{ fontSize: "16px" }} htmlFor="soDt">Số điện thoại <small className={style.text_danger}>*</small></label>
                        <input type="text" name="soDt" id="soDt" className={style.form_control}
                            placeholder="Enter username"
                            value={dataForm.soDt}
                            onChange={hanldeChange}
                            onBlur={handleBlur}
                            onInput={handleInput}
                            ref={el => formRef.current.soDt = el} />
                        <small className={style.text_danger}>{msgError.soDt}</small>
                    </div>

                    <div className={style.form_group}>
                        <label style={{ fontSize: "16px" }} htmlFor="email">Email <small className={style.text_danger}>*</small></label>
                        <input type="text" name="email" id="email" className={style.form_control} placeholder="Enter password"
                            value={dataForm.email}
                            onChange={hanldeChange}
                            onBlur={handleBlur}
                            onInput={handleInput}
                            ref={el => formRef.current.email = el}
                        />
                        <small className={style.text_danger}>{msgError.email}</small>
                    </div>
                    <div className={style.form_group}>
                        <label style={{ fontSize: "16px" }} htmlFor="matKhau">Password <small className={style.text_danger}>*</small></label>
                        <input type="password" name="matKhau" id="matKhau" className={style.form_control} placeholder="Enter password"
                            value={dataForm.matKhau}
                            onChange={hanldeChange}
                            onBlur={handleBlur}
                            onInput={handleInput}
                            ref={el => formRef.current.matKhau = el}
                        />
                        <small className={style.text_danger}>{msgError.matKhau}</small>
                    </div>
                    <div className={style.form_group}>
                        <label style={{ fontSize: "16px" }} htmlFor="xacNhanMatKhau">Confirm Password <small className={style.text_danger}>*</small></label>
                        <input type="password" name="xacNhanMatKhau" id="xacNhanMatKhau" className={style.form_control} placeholder="Enter password"
                            value={dataForm.xacNhanMatKhau}
                            onChange={hanldeChange}
                            onBlur={handleBlur}
                            onInput={handleInput}
                            ref={el => formRef.current.xacNhanMatKhau = el}
                        />
                        <small className={style.text_danger}>{msgError.xacNhanMatKhau}</small>
                    </div>
                    <div className={`${style.option_forgot}`}>
                        <input type="checkbox" name="" id="" />
                        <span style={{ color: "white" }}>&nbsp;I Agree To The
                            <span style={{ color: "rgb(49 215 169)" }}>&nbsp;Terms, Privacy Policy</span>
                            &nbsp;And&nbsp;
                            <span style={{ color: "rgb(49 215 169)" }}>Fees</span>
                        </span>
                    </div>
                    <div className={style.div_button}>
                        <button>SIGN IN</button>
                    </div>
                    <div style={{ color: "white" }} className={`${style.flex_center}`}>Already have an account?&nbsp; <Link to="/sign-in">Sign in</Link></div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
