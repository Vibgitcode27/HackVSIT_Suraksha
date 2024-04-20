"use client"

import "../../styles/dashboard.css"
import React from 'react';
import { useState } from "react";
import { Button, Typography } from "antd";
import { Card, Flex, Input, Spin, Space } from 'antd';
import { DingtalkOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { sign } from "@/lib/UserSlice/user";
import { useAppDispatch } from "@/lib/hooks";

export default function signup() {
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setlastName] = useState<string | null>();
    const [PhoneNumber, setPhoneNumber] = useState<string>();
    const [Email, setEmail] = useState<string>();
    const [Password, setPassword] = useState<string>();

    const dispatch = useAppDispatch();
    const router = useRouter()
    return (
        <div style={{ border: "2px solid rgb(21, 21, 21)", height: "99.6vh", backgroundColor: "rgb(21, 21, 21)" }}>
            <Flex align="center" justify="center" style={{ marginTop: "50px" }}>
                <Card
                    hoverable
                    style={{ width: "auto", backgroundColor: "rgb(10, 10, 10)", border: "2px solid yellow", color: "rgb(231, 231, 231)" }}
                >
                    <Flex justify='center' style={{ marginBottom: "10px" }}>
                        <DingtalkOutlined style={{ fontSize: "50px", color: "rgb(234, 230, 0)" }} />
                    </Flex>
                    <Flex justify='center' style={{ marginBottom: "10px" }} vertical>
                        <h1 style={{ fontSize: "30px", display: "flex", alignContent: 'center', justifyContent: "center" }}>Get started with your</h1>
                        <h1 style={{ fontSize: "30px", display: "flex", alignContent: 'center', justifyContent: "center", marginTop: "-20px" }}>account</h1>
                    </Flex>
                    <Flex align='center' justify="space-between" style={{ marginTop: "-30px" }}>
                        <Flex vertical>
                            <h3 style={{ color: " #828282", marginBottom: "4px" }}>First Name</h3>
                            <Input onChange={(e) => { setFirstName(e.target.value) }} placeholder=".-.-." style={{ width: "300px", height: "40px", border: "2px solid black" }} />
                        </Flex>
                        <Flex vertical>
                            <h3 style={{ color: " #828282", marginBottom: "4px" }}>Last Name</h3>
                            <Input onChange={(e) => { setlastName(e.target.value) }} placeholder=".-.-." style={{ width: "300px", height: "40px", border: "2px solid black" }} />
                        </Flex>
                    </Flex>

                    <Flex vertical align="center" justify="center" style={{ marginTop: "5px" }}>
                        <h3 style={{ color: " #828282", marginBottom: "4px", paddingRight: "250px" }}>Email</h3>
                        <Input onChange={(e) => { setEmail(e.target.value) }} style={{ width: "300px", height: "40px", border: "2px solid black" }} />
                    </Flex>
                    <Flex vertical align="center" justify="center">
                        <h3 style={{ color: " #828282", marginBottom: "4px", paddingRight: "180px" }}>Phone Number</h3>
                        <Input onChange={(e) => { setPhoneNumber(e.target.value) }} placeholder=".-.-." style={{ width: "300px", height: "40px", border: "2px solid black" }} />
                    </Flex>
                    <Flex vertical align="center" justify="center">
                        <h3 style={{ color: " #828282", marginBottom: "4px", paddingRight: "220px" }}>Password</h3>
                        <Space direction="vertical">
                            <Input.Password
                                onChange={(e) => { setPassword(e.target.value) }}
                                iconRender={(visible) => (visible ? <EyeTwoTone style={{ color: "yellow" }} /> : <EyeInvisibleOutlined />)}
                                style={{ width: "300px", height: "40px", border: "2px solid black" }}
                            />
                        </Space>
                    </Flex>
                    <Flex align="center" justify="center">
                        <Button onClick={async () => {
                            let data = await fetch("http://ec2-13-201-123-112.ap-south-1.compute.amazonaws.com:3000/signUp", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    email: Email,
                                    firstname: firstName,
                                    lastname: lastName,
                                    MobileNo: PhoneNumber,
                                    password: Password
                                })
                            })
                            let res = await data.json();
                            console.log("This is signUp", res)
                            if(res.created)
                                {
                                    dispatch(sign({
                                        email : Email ,
                                        firstName : firstName,
                                        lastName : lastName
                                    }))
                                    router.push("/dashboard")
                                }
                        }} type='primary' style={{ backgroundColor: "yellow", marginTop: "30px", width: "30%", color: "black", borderRadius: "20px" }}>Submit</Button>
                    </Flex>
                </Card>
            </Flex>
        </div>
    )
}