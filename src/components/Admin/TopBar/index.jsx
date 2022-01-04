import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Layout, Menu, Row } from 'antd';
import { DownOutlined, LogoutOutlined, NotificationOutlined, SwapOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

const { Header } = Layout;

function TopBar() {
    const [dataUser, setDataUser] = useState({})
    const navigate = useNavigate()

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('userInfo'))
    //     if (!data) {
    //         navigate("/sign-in")
    //     }
    //     setDataUser({ ...data, soDt: data.soDT })
    //     // eslint-disable-next-line
    // }, [])


    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("userInfo"))
        if (data) {
            let decodedToken = jwt_decode(data.accessToken)
           
            let currentDate = new Date();

            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                navigate('/sign-in')
                localStorage.removeItem("userInfo")
            } else {
                if (data.maLoaiNguoiDung === 'KhachHang') {
                    navigate('/')
                }else{
                    setDataUser({ ...data, soDt: data.soDT })
                }
            }
        }else{
            navigate('/sign-in')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleClick = e => {
        if (e.key === '1') {
            delete dataUser.accessToken

            navigate(`/admin/user/${dataUser.taiKhoan}`, { state: dataUser })
        }
        else if (e.key === '3') {
            localStorage.removeItem('userInfo')
            navigate("/sign-in")
        }
    }

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                Tài khoản
            </Menu.Item>
            <Menu.Item key="2" icon={<SwapOutlined />}>
                Đổi mật khẩu
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );


    return (
        <Header className="header" style={{ width: "100%", backgroundColor: "white" }} >
            <Row style={{ padding: "12px", justifyContent: "flex-end", paddingRight: "20px", }}>
                <Button style={{ border: "none" }}>
                    <NotificationOutlined />
                </Button>
                <Dropdown overlay={menu}>
                    <Button style={{ border: "none" }}>
                        {dataUser.hoTen} <DownOutlined />
                    </Button>
                </Dropdown>
            </Row>
        </Header>
    )
}

export default TopBar
