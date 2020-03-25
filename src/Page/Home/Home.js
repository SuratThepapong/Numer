import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Input, Typography } from 'antd';
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default () => (
  <Layout style={{ padding: '0 24px 24px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>HOME</Breadcrumb.Item>
    </Breadcrumb>
    <Content
      style={{
        background: '#fff',
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >

      <div>
        <Title type="secondary" strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome</Title>
        <Title type="secondary" strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Numerical Method</Title>
        <Title type="secondary" strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By Surat  Thepapong</Title>
        <Title type="secondary" strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6004062630582</Title>
      </div>
    </Content>
  </Layout>
);