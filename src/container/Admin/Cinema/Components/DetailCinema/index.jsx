import { InfoCircleOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import callApi from '../../../../../apis/callApi'

function DetailCinema() {
    const params = useParams()
    const [cinema, setListFilm] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            if (params.id) {
                const res = await callApi(`QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${params.id}&maNhom=GP02`)
                setListFilm(res.data[0])
            }
        })()// eslint-disable-next-line
    }, [])
    const columns = [
        {
            title: "Mã cụm rạp",
            dataIndex: 'maCumRap'
        },
        {
            title: "Tên cụm rạp",
            dataIndex: 'tenCumRap'
        },
        {
            title: "Địa chỉ",
            dataIndex: 'diaChi'
        },
        // {
        //     title: 'Info',
        //     key: 'info',
        //     render: (text, record) => (
        //         <Button onClick={() => Navigate(`/admin/cinema/a/${record.maCumRap}`)} icon={<InfoCircleOutlined />} />
        //     )
        // }
    ]

    return (
        <Content className="site-layout" style={{ padding: '0 50px 40px 50px', marginTop: 64 }}>
            <Button type="text" size={"large"} icon={<LeftOutlined />} onClick={() => navigate(-1)}>Back</Button>
            <h2 style={{ textAlign: 'center' }}>Chi tiết hệ thống rạp</h2>
            {/* <div style={{ display: 'flex', justifyContent: 'end', marginBottom: "15px" }}>
                <Button shape="round" size={"large"} style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>
                    <Link to="add-user" style={{ color: 'white' }}><UserAddOutlined />&nbsp;Thêm</Link>
                </Button>
            </div> */}
            {/* <div style={{ display: 'flex', justifyContent: 'end', marginBottom: "20px" }}>
                <Search placeholder="Type keyword ..." onSearch={(e) => handleSearch(e)}
                    style={{ width: 400 }} size='large' />
            </div> */}
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <Table columns={columns} dataSource={cinema.lstCumRap} rowKey={"maCumRap"} />
            </div>
        </Content >
    )
}

export default DetailCinema
