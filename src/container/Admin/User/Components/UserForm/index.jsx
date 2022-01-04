import { LeftOutlined } from "@ant-design/icons/lib/icons";
import { Button, Input, notification, Row, Select } from "antd";
import Form from "antd/lib/form/Form";
import { Content } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getAcessToken } from "../../../../../utils/getAccessToken";
import {
  isRequired,
  validateOneElement,
  isEmail,
  isPhoneNumber,
  minLength,
  isUsername,
  isPassword,
  isConfirmPaswword,
} from "../../../../../utils/validator";
import { addUserAsync, editUserAsync } from "../../userSplice";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function UserForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isAdd, setIsAdd] = useState(false);
  const [dataForm, setDataForm] = useState(() => {
    console.log(location.state);
    if (location.state) {
      return { ...location.state, maNhom: "GP02", soDt: location.state.soDt }; // thêm 1 truong soDt vi data là soDt
    }

    return {
      taiKhoan: "",
      hoTen: "",
      email: "",
      maNhom: "GP02",
      maLoaiNguoiDung: "KhachHang",
      soDt: "",
      matKhau: "",
      confirmPass: "",
    };
  });
  // console.log(dataForm);

  const [msgError, setMsgError] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDt: "",
    matKhau: "",
    confirmPass: "",
  });
  const params = useParams();
  const formRef = useRef({});
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (params["id"]) {
        // const res = await callApi("QuanLyNguoiDung/ThongTinTaiKhoan", "Post", { taiKhoan: params.id })
        // setDataForm(res.data)
        setIsAdd(false);
      } else {
        setIsAdd(true);
      }
    })();

    // eslint-disable-next-line
  }, []);

  //---------------- Validate --------------------
  const ruleList = {
    taiKhoan: isAdd ? [isRequired(), minLength(6), isUsername()] : [],
    hoTen: [isRequired()],
    email: [isRequired(), isEmail()],
    soDt: [isRequired(), isPhoneNumber()],
    matKhau: isAdd ? [isRequired(), minLength(6), isPassword()] : [],
    confirmPass: isAdd
      ? [isRequired(), minLength(6), isConfirmPaswword(dataForm.matKhau)]
      : [],
  };

  const handleBlur = (e) => {
    const res =
      validateOneElement(
        formRef.current[e.target.name].input,
        ruleList[e.target.name]
      ) ?? "";
    setMsgError({ ...msgError, [e.target.name]: res });
  };

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleInput = (e) => {
    e.target.style.borderColor = "#d9d9d9";
    setMsgError({ ...msgError, [e.target.name]: "" });
  };

  //-------------------- Modal ---------------------------

  const validateAll = () => {
    let flag = true;
    const msg = {};
    for (const [key, value] of Object.entries(ruleList)) {
      if (!formRef.current[key]) continue;
      const res = validateOneElement(formRef.current[key].input, value);
      if (res) flag = false;
      msg[key] = res ?? "";
    }
    setMsgError(msg);
    if (flag) setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const data = {
      body: dataForm,
      token: getAcessToken(),
    };

    const res = isAdd
      ? await dispatch(addUserAsync(data))
      : await dispatch(editUserAsync(data));
    if (res.payload?.status === 200) {
      notification.open({
        message: "Thông báo",
        description: isAdd ? "Create Account Success" : "Edit Account Success",
      });
      navigate(-1);
    } else {
      notification.open({
        message: "Thông báo",
        description: res.payload,
      });
    }
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Content
      className="site-layout"
      style={{
        padding: "0 50px 40px 50px",
        backgroundColor: "rgb(218, 226, 236)",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
        {isAdd ? "Add" : "Edit"} User
      </h1>
      <Form
        {...layout}
        name="nest-messages"
        style={{
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="">Username:</label>
          <Input
            id="taiKhoan"
            name="taiKhoan"
            value={dataForm.taiKhoan}
            type={"text"}
            onChange={handleChange}
            onInput={handleInput}
            onBlur={handleBlur}
            disabled={isAdd ? false : true}
            ref={(el) => (formRef.current.taiKhoan = el)}
          />
          <small style={{ color: "red" }}>{msgError.taiKhoan}</small>
        </Row>
        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="">FullName:</label>
          <Input
            id="hoTen"
            name="hoTen"
            value={dataForm.hoTen}
            type={"text"}
            onChange={handleChange}
            onInput={handleInput}
            onBlur={handleBlur}
            ref={(el) => (formRef.current.hoTen = el)}
          />
          <small style={{ color: "red" }}>{msgError.hoTen}</small>
        </Row>
        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="email">Email:</label>
          <Input
            id="email"
            name="email"
            value={dataForm.email}
            type={"text"}
            onChange={handleChange}
            onInput={handleInput}
            onBlur={handleBlur}
            ref={(el) => (formRef.current.email = el)}
          />
          <small style={{ color: "red" }}>{msgError.email}</small>
        </Row>
        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="soDt">Phone Number:</label>
          <Input
            id="soDt"
            name="soDt"
            value={dataForm.soDt}
            type={"number"}
            onChange={handleChange}
            onInput={handleInput}
            onBlur={handleBlur}
            ref={(el) => (formRef.current.soDt = el)}
          />
          <small style={{ color: "red" }}>{msgError.soDt}</small>
        </Row>
        {/* chỉ thêm tài khoản mới có trường mật khẩu */}
        {isAdd ? (
          <>
            <Row style={{ margin: "10px 20px", width: "545px" }}>
              <label htmlFor="matKhau">Password:</label>
              <Input
                id="matKhau"
                name="matKhau"
                value={dataForm.matKhau}
                type={"password"}
                onChange={handleChange}
                onInput={handleInput}
                onBlur={handleBlur}
                ref={(el) => (formRef.current.matKhau = el)}
              />
              <small style={{ color: "red" }}>{msgError.matKhau}</small>
            </Row>
            <Row style={{ margin: "10px 20px", width: "545px" }}>
              <label htmlFor="confirmPass">confirm Password:</label>
              <Input
                id="confirmPass"
                name="confirmPass"
                value={dataForm.confirmPass}
                type={"password"}
                onChange={handleChange}
                onInput={handleInput}
                onBlur={handleBlur}
                ref={(el) => (formRef.current.confirmPass = el)}
              />
              <small style={{ color: "red" }}>{msgError.confirmPass}</small>
            </Row>
          </>
        ) : (
          ""
        )}
        <Row style={{ margin: "10px 20px", width: "545px" }}>
          <label htmlFor="maLoaiNguoiDung">Role user:</label>
          <Select
            value={dataForm.maLoaiNguoiDung}
            style={{ width: "100%" }}
            onChange={(value) =>
              setDataForm({ ...dataForm, maLoaiNguoiDung: value })
            }
            id="maLoaiNguoiDung"
          >
            <Select.Option value="KhachHang">Khách hàng</Select.Option>
            <Select.Option value="QuanTri">Quản trị</Select.Option>
          </Select>
        </Row>

        <Row
          style={{
            margin: "20px 20px 0 20px",
            backgroundColor: "white",
            width: "100%",
          }}
          justify="space-between"
        >
          <Button
            type="text"
            size={"large"}
            icon={<LeftOutlined />}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            style={{ width: "150px" }}
            type="primary"
            shape="round"
            size={"large"}
            onClick={() => validateAll()}
          >
            Submit
          </Button>
        </Row>
      </Form>

      <Modal
        title="Confirm"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <p>Are You sure {isAdd ? "add" : "edit"} user ?</p>
      </Modal>
    </Content>
  );
}

export default UserForm;
