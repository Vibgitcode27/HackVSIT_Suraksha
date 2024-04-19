"use client"

import "../../styles/dashboard.css"
import React from 'react';
import { useState } from "react";
import { Button, Typography } from "antd";
import { Card, Flex, Input, Spin, Space } from 'antd';
import { DingtalkOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { sign } from "@/lib/UserSlice/user";

export default function signin() {
    const [Password , setPassword] = useState<string>();
    const [Username , setUsername] = useState<string>();

    const dispatch = useAppDispatch();

    const router = useRouter()
    return (
        <div style={{ border: "2px solid rgb(21, 21, 21)", height: "99.6vh", backgroundColor: "rgb(21, 21, 21)" }}>
            <Flex align="center" justify="center" style={{ marginTop: "100px" }}>
                <Card
                    hoverable
                    style={{ width: "auto", backgroundColor: "rgb(10, 10, 10)", border: "2px solid yellow", color: "rgb(231, 231, 231)" }}
                >
                    <Flex justify='center' style={{ marginBottom: "10px" }}>
                        <DingtalkOutlined style={{ fontSize: "50px", color: "rgb(234, 230, 0)" }} />
                    </Flex>
                    <Flex justify='center' style={{ marginBottom: "10px" }} vertical>
                        <h1 style={{ fontSize: "30px", display: "flex", alignContent: 'center', justifyContent: "center" }}>Log into your</h1>
                        <h1 style={{ fontSize: "30px", display: "flex", alignContent: 'center', justifyContent: "center", marginTop: "-20px" }}>account</h1>
                    </Flex>

                    <Flex vertical align="center" justify="center" style={{ marginTop: "5px" }}>
                        <h3 style={{ color: " #828282", marginBottom: "4px", paddingRight: "250px" }}>Email</h3>
                        <Input onChange={(e) => { setUsername(e.target.value)}} style={{ width: "300px", height: "40px", border: "2px solid black" }} />
                    </Flex>
                    <Flex vertical align="center" justify="center">
                        <h3 style={{ color: " #828282", marginBottom: "4px", paddingRight: "220px" }}>Password</h3>
                        <Space direction="vertical">
                            <Input.Password
                                onChange={(e) => { setPassword(e.target.value)}}
                                iconRender={(visible) => (visible ? <EyeTwoTone style={{ color : "yellow" }} /> : <EyeInvisibleOutlined />)}
                                style={{ width: "300px", height: "40px", border: "2px solid black" }}
                            />
                        </Space>
                    </Flex>
                    <Flex align="center" justify="center">
                        <Button
                             onClick={ async () => {
                                const obj = {
                                    username : Username ,
                                    password : Password
                                }
                                let data = await fetch("http://ec2-13-201-123-112.ap-south-1.compute.amazonaws.com:3000/admin", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(obj)
                                // email : "shashwat123student@gmail.com",
                                // password : "123"
                            })
                            let res = await data.json();
                            console.log("This is response", res)
                            if(res.message === "Yes")
                                {
                                    dispatch(sign({
                                        username : Username,
                                    }))
                                    router.push("/dashboard")
                                }
                        }}
                        type='primary' style={{ backgroundColor: "yellow", marginTop: "30px", width: "30%", color: "black" , borderRadius : "20px" }}>Submit</Button>
                    </Flex>
                </Card>
            </Flex>
        </div>
    )
}