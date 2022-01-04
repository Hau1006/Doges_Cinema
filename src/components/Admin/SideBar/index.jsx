
import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    FireFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

function SideBar() {

    const [collapsed, setCollapsed] = useState(window.innerWidth > 1100 ? false : true)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1300) {//&& collapsed === true
                setCollapsed(false)
            } else if (window.innerWidth <= 1200) {//&& collapsed === false
                setCollapsed(true)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }//eslint-disable-next-line
    }, [])

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    return (
        <Sider className="site-layout-background" style={{ height: "100vh", maxWidth: "160px" }}
            collapsible collapsed={collapsed} onCollapse={onCollapse} theme='light'  >
            <div style={{ fontSize: "42px", padding: "16px", textAlign: "center", color: "red", backgroundColor: "white" }}>
                <FireFilled />
            </div>
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }} >
                <Menu.Item key="1" icon={<UserOutlined />}><Link to="/admin/user">User</Link></Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}><Link to="/admin/film">Film</Link></Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}><Link to="/admin/cinema">Manage Cinema</Link></Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideBar
