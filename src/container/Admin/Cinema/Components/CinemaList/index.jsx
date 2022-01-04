import { InfoCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import callApi from '../../../../../apis/callApi'
import style from './index.module.css'

function CinemaList() {
    const navigate = useNavigate()
    const [cinema, setCinema] = useState([])


    useEffect(() => {
        (async () => {
            const res = await callApi(`QuanLyRap/LayThongTinHeThongRap`)
            setCinema(res.data)
        })()
        // eslint-disable-next-line
    }, [])


    const columns = [
        {
            title: "Mã hệ thống rạp",
            dataIndex: 'maHeThongRap'
        },
        {
            title: "Tên hệ thống rạp",
            dataIndex: 'tenHeThongRap'
        },
        {
            title: "Bí danh",
            dataIndex: 'biDanh'
        },
        {
            title: "Logo",
            dataIndex: 'logo',
            render: (text, record) => (<div className={style.wrappedImg}><img src={record.logo} alt="" /></div>)
        },
        {
            title: 'Info',
            key: 'info',
            render: (text, record) => (
                <Button onClick={() => navigate(`/admin/cinema/${record.maHeThongRap}`)} icon={<InfoCircleOutlined />} />
            )
        }
    ]

    return (
        <Content className="site-layout" style={{ padding: '0 50px 40px 50px', marginTop: 64 }}>
            <h2 style={{ textAlign: 'center' }}>Quản Rạp</h2>
            {/* <div style={{ display: 'flex', justifyContent: 'end', marginBottom: "15px" }}>
                <Button shape="round" size={"large"} style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>
                    <Link to="add-user" style={{ color: 'white' }}><UserAddOutlined />&nbsp;Thêm</Link>
                </Button>
            </div> */}
            {/* <div style={{ display: 'flex', justifyContent: 'end', marginBottom: "20px" }}>
                <Search placeholder="Type keyword ..." onSearch={(e) => handleSearch(e)}
                    style={{ width: 400 }} size='large' />
            </div> */}
            <div className="site-layout-background" style={{ minHeight: 380 }}>
                <Table columns={columns} dataSource={cinema} rowKey={"maHeThongRap"} />
            </div>
        </Content >
    )
}

export default CinemaList
