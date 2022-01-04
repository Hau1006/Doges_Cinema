import React from 'react'
import UserList from '../../Components/UserList';
import './style.css'
import { Layout, Row } from 'antd';

const { Content, } = Layout;


function UserPage() {
    return (
        <Row>
            <Content style={{ paddingRight: "30px", backgroundColor: "white", float: "right" }}>
                <Layout className="site-layout-background">
                    <UserList />
                </Layout>
            </Content>
        </Row>
    )
}

export default UserPage
