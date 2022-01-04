import { InfoCircleOutlined, ScheduleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import callApi from '../../../../../apis/callApi'
import NumberFormat from "react-number-format";

function ShowTime() {
  const params = useParams();
  const [cinemaList, setCinemaList] = useState([]);
  const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            if (params.id) {
                const res = await callApi(`QuanLyPhim/LayThongTinPhim?MaPhim=${params.id}`)
                console.log(res)
                setCinemaList(res.data.lichChieu)
            }
        })()// eslint-disable-next-line
    }, [])
    const columns = [
        {
            title: "Tên cụm rạp",
            // dataIndex: 'thongTinRap.tenCumRap',
            render: (text, record) => record.thongTinRap.tenCumRap
        },
        {
            title: "Tên rạp",
            render: (text, record) => record.thongTinRap.tenRap
            // dataIndex: 'thongTinRap.tenRap'
        },
        {
            title: "Ngày giờ chiếu",
            dataIndex: 'ngayChieuGioChieu'
        },
        {
            title: "Giá vé",
            render :(text,record)=> (<NumberFormat value={record.giaVe} displayType={'text'} thousandSeparator={true} suffix='VND' />)
        },
        {
            title: 'Info',
            key: 'info',
            render: (text, record) => (
                <Button onClick={() => navigate(`/admin/film/detail-seat/${record.maLichChieu}`)} icon={<InfoCircleOutlined />} />
            )
        }
    ]
  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px 40px 50px", marginTop: 64 }}
    >
      <h2 style={{ textAlign: "center" }}>Showtimes</h2>
      <div
        style={{ display: "flex", justifyContent: "end", marginBottom: "15px" }}
      >
        <Button
          shape="round"
          size={"large"}
          style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
        >
          <Link
            to={`/admin/film/add-schedule/${params.id}`}
            style={{ color: "white" }}
          >
            <ScheduleOutlined />
            &nbsp;Add
          </Link>
        </Button>
      </div>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 380 }}
      >
        <Table
          columns={columns}
          dataSource={cinemaList}
          rowKey={"maLichChieu"}
        />
      </div>
    </Content>
  );
}

export default ShowTime;
