import {
  DeleteOutlined,
  EditOutlined,
  ScheduleOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons/lib/icons";
import { Button, Input, Layout, notification, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAcessToken } from "../../../../../utils/getAccessToken";
import {
  deleteMovieAsync,
  fetchMovieAsync,
  selectMovieList,
} from "../../movieSplice";

const { Content } = Layout;

function MovieList() {
  const state = useSelector(selectMovieList);
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setMovieList(state);
  }, [state]);

  useEffect(() => {
    (async () => {
      dispatch(fetchMovieAsync());
    })();
  }, [dispatch,state]);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [tempMaphim, setTempMaphim] = useState("");

  const showModal = (maPhim) => {
    setTempMaphim(maPhim);
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const data = {
      maPhim: +tempMaphim,
      body: null,
      token: getAcessToken(),
    };
    const res = await dispatch(deleteMovieAsync(data));

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
    setMovieList(() => {
      const result = state.filter((params) => {
        return params.tenPhim.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      return result;
    });
  };

  const columns = [
    { key: 1, title: "Code Movie", dataIndex: "maPhim" },
    {
      key: 2,
      title: "Movie Name",
      dataIndex: "tenPhim",
    },

    {
      key: 3,
      title: "Image",
      dataIndex: "hinhAnh",
      render: (text, record) => {
        return (
          <img
            src={record.hinhAnh}
            alt={record.tenPhim}
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
        );
      },
    },
    {
      key: 4,
      title: "Descriptions",
      dataIndex: "moTa",
      render: (text, record) => {
        return (
          <p
            style={{
              maxWidth: "100px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {record.moTa}
          </p>
        );
      },
    },
    {
      key: 5,
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() =>
              navigate(`/admin/film/${record.maPhim}`, { state: record })
            }
            icon={<EditOutlined style={{ color: "blue" }} />}
          />
          <Button
            onClick={() => showModal(record.maPhim)}
            icon={<DeleteOutlined style={{ color: "red" }} />}
          ></Button>
          <Button
            onClick={() =>
              navigate(`/admin/film/showtime/${record.maPhim}`, {
                state: record,
              })
            }
            icon={<ScheduleOutlined style={{ color: "green" }} />}
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
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Manager Movie</h1>
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
          placeholder="Search Movie By Name ..."
          onSearch={(e) => handleSearch(e)}
          style={{ width: 400 }}
          size="large"
        />

        <Button
          shape="round"
          size={"large"}
          style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
        >
          <Link to="add-movie" style={{ color: "white" }}>
            <UserAddOutlined />
            &nbsp;Add Movie
          </Link>
        </Button>
      </div>
      <div className="site-layout-background" style={{ minHeight: 380 }}>
        <Table
          columns={columns}
          dataSource={movieList}
          rowKey={(r) => r.maPhim}
        />
      </div>
      <Modal
        title="Deletes Movie"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <p>Are You Sure Want to Delete {tempMaphim} ?</p>
      </Modal>
    </Content>
  );
}

export default MovieList;
