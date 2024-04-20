import React from "react";
import "../styles/dashboard.css"
import {Flex , Typography , Button , Layout} from "antd"
import { Input} from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
const { Search } = Input;

export function MainHeader() {
    return (
        <Flex align="center" justify="space-between">
            <Typography.Title level={3} type="secondary" style={{color : "rgb(231, 231, 231)" , marginTop : "0px"}}>
                Dashboard
            </Typography.Title>
            <Search
            placeholder="Search Incidents"
            enterButton="Search"
            size="large"
            className="searchBar"
            style={{ width:600 , marginTop : "-15px" }}
            />
            <Button className="contributeBtn">Contribute</Button>
        </Flex>
    )
}