"use client"
import "../../styles/dashboard.css"
import { Avatar, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Layout, Button, Flex, Card, Progress } from 'antd';
import { DingtalkOutlined } from '@ant-design/icons';
import { MainHeader } from "@/app/(components)/Header";
import { Menu } from "antd";
import { AppstoreOutlined, LogoutOutlined, CompassFilled, FireFilled, } from "@ant-design/icons";
import { useRouter } from "next/navigation";
// Redux Imports
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProfileInfo } from "@/app/(components)/Dashboard";
import { Reported } from "@/app/(components)/Posted";
import { Explore } from "@/app/(components)/Explore";

const items = [
  {
    key: 1,
    icon: <AppstoreOutlined className="sidebar-icons" />,
    label: <span style={{ color: "rgb(231, 231, 231)" }}>Dashboard</span>
  },
  {
    key: 2,
    icon: <CompassFilled className="sidebar-icons" />,
    label: <span style={{ color: "rgb(231, 231, 231)" }}>Created</span>
  },
  {
    key: 3,
    icon: <FireFilled className="sidebar-icons" />,
    label: <span style={{ color: "rgb(231, 231, 231)" }}>Explore</span>
  },
  {
    key: 4,
    icon: <LogoutOutlined className="sidebar-icons" />,
    label: <span style={{ color: "rgb(231, 231, 231)" }}>Logout</span>
  },
]

const { Header, Content, Sider } = Layout;
export default function Dashboard() {

  const firstName = useAppSelector( state => state.user.firstname)
  const lastName = useAppSelector( state => state.user.lastname)

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleMenuClick = (index: number) => {
    setSelectedIndex(index);
    console.log(selectedIndex);
  }
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Sider
        style={{ backgroundColor: "rgb(21, 21, 21)" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className='sider'
      >
        <div>
          <Flex vertical align="center" justify="center">
            <Flex align="center" justify="center">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 120 }}
                icon={<DingtalkOutlined />}
                style={{ color: "rgb(234, 230, 0)", marginTop: "35px" }}
              />
            </Flex>
              <Typography.Title level={4} style={{ color : "white" , marginTop : "15px" }}>{firstName} { lastName}</Typography.Title>
              <Button className="edit-button"> Edit </Button>
          </Flex>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            className="menu-bar"
            selectedKeys={[String(selectedIndex + 1)]}
          >
            {items?.map(item => (
              <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key - 1)}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <Button
          type="text"
          // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          // onClick={() => { setCollapsed(!collapsed) }}
          className="trigger-btn"
        />
      </Sider>
      <Layout style={{ backgroundColor: "rgb(23, 23, 23)" }}>
        <Header className='header'>
          <MainHeader />
        </Header>
        <Content className='content'>
          <Flex gap="large">
            <div></div>

            {/* DASHBOARD CONTENT */}
            {selectedIndex == 0 && (
              <ProfileInfo/>
            )}
            {/* EXPLORE CONTENT */}
            {selectedIndex == 1 && (
              <Reported/>
            )}
            {/* FOR YOU CONTENT */}
            {selectedIndex == 2 && (
              <Explore/>
            )}
            {/* LOGOUT METHOD */}
            {/* {selectedIndex == 3 && (
              <Logout />
            )} */}
          </Flex>
        </Content>
      </Layout>
      {/* <SideProfile /> */}
    </Layout>
  );
}