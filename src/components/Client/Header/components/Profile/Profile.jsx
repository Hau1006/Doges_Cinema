import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Menu, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  changeAsyncUserAccount,
  selectMovieList,
} from "../../../../../container/Client/Home/module/accountSlice";
import { checkLogin } from "../../../../../utils/checkLogin";
import { getAcessToken } from "../../../../../utils/getAccessToken";

function Profile() {
  const navigate = useNavigate();
  const accountSlice = useSelector(selectMovieList);
  const [openAccount, setOpenAccount] = useState(false);
  const [infoUser, setInfoUser] = useState({});
  const dispatch = useDispatch();
  function logout() {
    localStorage.clear();
    //navigate(0); //logout back current page
    navigate("/"); // back home page
  }
  const openModal = () => {
    setOpenAccount(true);
  };
  useEffect(() => {
    const info2 = JSON.parse(localStorage.getItem("userInfo2"));
    setInfoUser(info2);
  }, []);

  const onFinish = async (values) => {
    const Data = {
      taiKhoan: values.taiKhoan,
      matKhau: infoUser.matKhau,
      email: values.email,
      soDt: values.soDT,
      maNhom: "GP02",
      maLoaiNguoiDung: "KhachHang",
      hoTen: values.hoTen,
    };
    const data = { body: Data, token: getAcessToken() };
    const res = await dispatch(changeAsyncUserAccount(data));
    if (res.payload?.status === 200) {
      notification.success({
        message: "Notification",
        description: res.payload.message,
      });
    } else {
      notification.error({
        message: "Notification",
        description: res.payload,
      });
    }
    if (accountSlice) {
      setOpenAccount(false);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/booking-history">
          <span>History Booking</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <span onClick={() => openModal()}>Change Account</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <span onClick={logout}>Logout</span>
      </Menu.Item>
    </Menu>
  );
  if (checkLogin() != null) {
    return (
      <>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button className="BtnCustom" size="large">
            <UserOutlined />
            {checkLogin().taiKhoan}
          </Button>
        </Dropdown>
        <Modal
          onCancel={() => setOpenAccount(false)}
          title="Change Account"
          visible={openAccount}
          footer={null}
        >
          <Form
            style={{ padding: "2rem", backgroundColor: "rgb(218, 226, 236)" }}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            onFinish={onFinish}
          >
            <Form.Item
              name="taiKhoan"
              rules={[
                { required: true, message: "Please input user name account!" },
              ]}
              label="Name Account"
              initialValue={infoUser?.taiKhoan}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="hoTen"
              rules={[{ required: true, message: "Please input user name!" }]}
              label="Name User"
              initialValue={infoUser?.hoTen}
              tooltip="What do you want others to call you?"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is not valid",
                  type: "email",
                },
              ]}
              label="Email "
              initialValue={infoUser?.email}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="soDT"
              rules={[{ required: true, message: "Phone number is required!" }]}
              label="Phone Number "
              initialValue={infoUser?.soDT}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                width: "100%",
              }}
            >
              <Button
                style={{
                  display: "inline-block",
                  // padding: "1rem",
                  marginTop: "1rem",
                  fontSize: "1rem",
                  borderRadius: "0.25rem",
                  letterSpacing: "0.1rem",
                  borderColor: "transparent",
                  backgroundColor: "hsl(205, 78%, 60%)",
                  color: "white",
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
  return (
    <>
      <Link to="/sign-in">
        <Button className="BtnCustom" size="large">
          Login
        </Button>
      </Link>
    </>
  );
}

export default Profile;
