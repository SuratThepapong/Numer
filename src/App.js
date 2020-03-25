import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon, Input } from 'antd';
import Routing from "./Route/Link";
import { Route, Link, NavLink } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

  class App extends Component {
    render() {
      return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1"><Link to="/Home"><Icon type="home" />Home</Link></Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="laptop" />
                    Root of equation
                  </span>
                }
              >
                <Menu.Item key="1.1"><Link to="/products">Bisection</Link></Menu.Item>
                <Menu.Item key="1.2"><Link to="/FalsePosition">FalsePosition</Link></Menu.Item>
                <Menu.Item key="1.3"><Link to="/OnePoint">One-Point Iteration</Link></Menu.Item>
                <Menu.Item key="1.4"><Link to="/Newton">Newton-Raphson</Link></Menu.Item>
                <Menu.Item key="1.5"><Link to="/Secant">Secant</Link></Menu.Item>
              </SubMenu>
              
            </Menu>
          </Sider>
              <Routing />
        </Layout>
      </Layout>

      );
    }
  }

  export default App;