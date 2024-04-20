"use client"
import "../../styles/dashboard.css"
import { Avatar, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {Image , Layout, Button, Flex, Input, Card, Progress } from 'antd';
import { DingtalkOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { AppstoreOutlined, LogoutOutlined, CompassFilled, FireFilled, } from "@ant-design/icons";
import { useRouter } from "next/navigation";
const { Search } = Input;
// Redux Imports
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Explre 
import { Collapse } from 'antd';

const { Panel } = Collapse;
const { Meta } = Card;

const items = [
    {
        key: 1,
        icon: <AppstoreOutlined className="sidebar-icons" />,
        label: <span style={{ color: "rgb(231, 231, 231)" }}>Dashboard</span>
    },
    {
        key: 2,
        icon: <LogoutOutlined className="sidebar-icons" />,
        label: <span style={{ color: "rgb(231, 231, 231)" }}>Logout</span>
    },
]

const { Header, Content, Sider } = Layout;
export default function Dashboard() {

    const username = useAppSelector(state => state.user.username)

    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleMenuClick = (index: number) => {
        setSelectedIndex(index);
        console.log(selectedIndex);
    }
    const dispatch = useAppDispatch();

    // HEADER

    const [expanded, setExpanded] = useState(false);
    const [change, setChange] = useState<number>(0);
    const [data, setData] = useState([])
    const [searchId, setSearchId] = useState<string>("");

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    async function handleSearch() {
        console.log(searchId);
        if(searchId)
            {
                try {
                    let data = await fetch("http://ec2-13-201-123-112.ap-south-1.compute.amazonaws.com:3000/getpostId", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ postId : searchId })
                    })
                    let res = await data.json();
                    console.log(res.post)
                    setData([res.post]);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            else
            {
                Async();
            }
    }

    async function Async() {
        let data = await fetch("http://ec2-13-201-123-112.ap-south-1.compute.amazonaws.com:3000/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        let res = await data.json();
        console.log(res)
        setData(res.posts);
    }

    useEffect(() => {
        if (data) {
            Async();
            console.log("Data has been set")
        }
        console.log("in use effect", data)
    }, [change])
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
                        <Typography.Title level={4} style={{ color: "white", marginTop: "15px" }}>{username}</Typography.Title>
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
                    <Flex align="center" justify="space-between">
                        <Typography.Title level={3} type="secondary" style={{ color: "rgb(231, 231, 231)", marginTop: "0px" }}>
                            Dashboard
                        </Typography.Title>
                        <Search
                            placeholder="Search Incidents"
                            enterButton="Search"
                            size="large"
                            className="searchBar"
                            style={{ width: 600, marginTop: "-15px" }}
                            onChange={(e) => setSearchId(e.target.value)}
                            onSearch={handleSearch}
                        />
                        <Button className="contributeBtn">Contribute</Button>
                    </Flex>
                </Header>
                <Content className='content'>
                    <Flex gap="large">
                        <div></div>

                        {/* DASHBOARD CONTENT */}
                        {selectedIndex == 0 && (

                            // This is explore code

                            <Flex align='center' justify='center' style={{ width: "80vw", height: "85vh" }} vertical>
                                <div style={{
                                    height: "75vh",
                                    overflowY: "scroll",
                                    WebkitOverflowScrolling: "touch",
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                    // borderRight: "2px solid rgb(178, 178, 178)", borderLeft: "2px solid rgb(178, 178, 178)", borderRadius: "100px",
                                }}>
                                    {Array.isArray(data) && data?.map((item, index) => (
                                        <Flex>
                                            <Card
                                                hoverable
                                                style={{ width: 550, height: "auto", marginBottom: "30px", backgroundColor: "#e7ecfcde" }}
                                                cover={<Image alt="example" src={item?.image} style={{ padding: "20px", borderRadius: "50px" }} />}
                                            >
                                                <Flex align='center' justify='space-between'>
                                                    <Meta title="Description" />
                                                    <Button style={{ backgroundColor: "rgb(219, 37, 37)", fontSize: "14px", fontWeight: 600, color: "black", height: "42px", width: "120px", borderRadius: "20px" }}
                                                        onClick={async () => {
                                                            try {
                                                                let data = await fetch("http://ec2-13-201-123-112.ap-south-1.compute.amazonaws.com:3000/postcensor", {
                                                                    method: "PUT",
                                                                    headers: {
                                                                        "Content-Type": "application/json"
                                                                    },
                                                                    body: JSON.stringify({
                                                                        postId: item.id // Pass the postId here
                                                                    })
                                                                });
                                                                let res = await data.json();
                                                                console.log(res);
                                                            } catch (error) {
                                                                console.error('Error:', error);
                                                            }
                                                        }}
                                                    >{item?.censor == "false" ? "Censored" : "Censor "}</Button>
                                                </Flex>
                                                <Collapse
                                                    activeKey={expanded ? '1' : ''}
                                                    onChange={toggleExpanded}
                                                    bordered={false}
                                                >
                                                    <Panel style={{ marginTop: "20px" }} header={item?.content} key="1">
                                                        <span>This is the additional text.</span>
                                                    </Panel>
                                                </Collapse>
                                                <Flex align='center' justify='center' style={{ marginTop: "20px" }}>
                                                    <Button style={{ backgroundColor: "rgb(23, 23, 23)", fontSize: "18px", fontWeight: 600, color: "rgb(231, 231, 231)", height: "45px", width: "130px", borderRadius: "20px" }}
                                                        onClick={() => { window.open("https://www.google.com/maps?q=" + item.latitude + "," + item.longitude, "_blanck") }}>Locate</Button>
                                                </Flex>
                                            </Card>
                                        </Flex>
                                    ))}
                                </div>
                            </Flex>

                        )}
                        {/* LOGOUT METHOD */}
                        {/* {selectedIndex == 2 && (
              <Logout />
            )} */}
                    </Flex>
                </Content>
            </Layout>
            {/* <SideProfile /> */}
        </Layout>
    );
}