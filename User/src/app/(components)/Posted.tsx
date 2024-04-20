import { Button, Card, Flex, Image } from 'antd';
import { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import { useAppSelector } from '@/lib/hooks';
// Upload
import type { GetProp, UploadFile, UploadProps } from 'antd';

const { Panel } = Collapse;
const { Meta } = Card;

export function Reported() {
    const [expanded, setExpanded] = useState(false);
    const [change, setChange] = useState<number>(0);
    const [data, setData] = useState([])
    // New
    const [loading, setLoading] = useState<boolean>(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);

    const email = useAppSelector(state => state.user.email);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    async function Async() {
        let data = await fetch("http://ec2-13-201-123-112.ap-south-1.compute.amazonaws.com:3000/userPosts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
        let res = await data.json();
        console.log(res)
        setData(res.userPosts);
    }

    useEffect(() => {
        if (data) {
            Async();
            console.log("Data has been set")
        }
        console.log("in use effect", data)
    }, [email, change])

    const handleModalClose = () => {
        setModal2Open(false);
      };
    
      const handleModalClose2 = () => {
        setModal3Open(false);
      };

    return (
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
                    <Flex key={item.id}>
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
                                            let data = await fetch("http://ec2-13-201-123-112.ap-south-1.compute.amazonaws.com:3000/deletePost", {
                                                method: "DELETE",
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
                                >Delete</Button>
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
                            <Flex align='center' justify='space-between' style={{ marginTop: "20px" }}>
                                <span style={{ color: "rgb(0 ,0,0,0)" }}>ok</span>
                                <Button style={{ backgroundColor: "rgb(23, 23, 23)", fontSize: "18px", fontWeight: 600, color: "rgb(231, 231, 231)", height: "45px", width: "130px", borderRadius: "20px" }}
                                    onClick={() => { window.open("https://www.google.com/maps?q=" + item.latitude + "," + item.longitude, "_blank") }}>Locate
                                </Button>
                                <div style={{ padding: "20px", width: "80px", border: "5px solid red", borderRadius: "100%" }}>
                                    <span style={{ color: "black", fontSize: "20px", marginLeft: "9px" }}> {item.sentiment} </span>
                                </div>
                            </Flex>
                        </Card>
                    </Flex>
                ))}
            </div>
        </Flex>
    )
}