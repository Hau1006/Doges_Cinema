import React, { useEffect, useState } from "react";
import { Button, Layout, notification, Space } from "antd";
import { Table } from "antd";
import Search from "antd/lib/input/Search";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons/lib/icons";
import { Link, useNavigate } from "react-router-dom";
import { getAcessToken } from "../../../../../utils/getAccessToken";
import {
  deleteUserAsync,
  fetchUserAsync,
  selectUserList,
} from "../../userSplice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "antd/lib/modal/Modal";

const { Content } = Layout;

function UserList() {
  const state = useSelector(selectUserList);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserList(state);
  }, [state]);

  useEffect(() => {
    if (state.length === 0) {
      (async () => {
        dispatch(fetchUserAsync());
      })();
    } // eslint-disable-next-line
  }, []);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [tempTaiKhoan, setTempTaiKhoan] = useState("");

  const showModal = (taiKhoan) => {
    setTempTaiKhoan(taiKhoan);
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const data = {
      taiKhoan: tempTaiKhoan,
      body: null,
      token: getAcessToken(),
    };
    const res = await dispatch(deleteUserAsync(data));

    if (res.payload?.status === 200) {
      notification.open({
        message: "Thông báo",
        description: res.payload.message,
      });
    } else {
      notification.open({
        message: "Thông báo",
        description: res.payload,
      });
    }
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleSearch = (value) => {
    setUserList(() => {
      const result = state.filter((params) => {
        return (
          params.taiKhoan.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          params.hoTen.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          params.email.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          params.soDt.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
      return result;
    });
  };

  const columns = [
    {
      title: "Name Account",
      dataIndex: "taiKhoan",
    },
    {
      title: "Full Name",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "soDt",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() =>
              navigate(`/admin/user/${record.taiKhoan}`, { state: record })
            }
            icon={<EditOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => showModal(record.taiKhoan)}
            icon={<DeleteOutlined style={{ color: "red" }} />}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <Content
      className="site-layout"
      style={{
        padding: "0 50px 40px 50px",
        backgroundColor: "rgb(218, 226, 236)",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Manager User</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "1.5rem",
        }}
      >
        <Search
          placeholder="Type keyword ..."
          onSearch={(e) => handleSearch(e)}
          style={{ width: 400 }}
          size="large"
        />

        <Button
          shape="round"
          size={"large"}
          style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
        >
          <Link to="add-user" style={{ color: "white" }}>
            <UserAddOutlined />
            &nbsp;Add user
          </Link>
        </Button>
      </div>
        <Table columns={columns} dataSource={userList} rowKey={"taiKhoan"} />
     
      <Modal
        title="Delete User"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <p>Are you sure want to delete {tempTaiKhoan} </p>
      </Modal>
    </Content>
  );
}

export default UserList;
//withData(, "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP06")
