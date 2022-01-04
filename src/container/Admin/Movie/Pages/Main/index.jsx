import React from "react";
import MovieList from "../../Components/MovieList/index";
import "./style.css";
import { Layout, Row } from "antd";

const { Content } = Layout;

function UserPage() {
  return (
    <Row>
      <Content
        style={{
          paddingRight: "30px",
          backgroundColor: "white",
          float: "right",
        }}
      >
        <Layout className="site-layout-background">
          <MovieList />
        </Layout>
      </Content>
    </Row>
  );
}

export default UserPage;
