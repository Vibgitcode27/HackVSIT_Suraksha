import { Button, Card, Flex, Image } from 'antd';
import { useState ,useEffect } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const { Meta } = Card;

export function Explore() {

    const [expanded, setExpanded] = useState(false);
    const [change , setChange]  = useState<number>(0);
    const [data, setData] = useState([])

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

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
        if(data)
            {
                Async();
                console.log("Data has been set")
            }
        console.log("in use effect" , data)
    }, [change])

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
                <Flex>
                <Card
                    hoverable
                    style={{ width: 550, height: "auto", marginBottom: "30px", backgroundColor: "#e7ecfcde" }}
                    cover={<Image alt="example" src={item?.image} style={{ padding: "20px", borderRadius: "50px" }} />}
                >
                    <Meta title="Description" />
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
                        <Button style={{ backgroundColor : "rgb(23, 23, 23)" , fontSize : "18px" , fontWeight : 600 , color : "rgb(231, 231, 231)" , height : "45px" , width : "130px" , borderRadius : "20px"}}
                            onClick={() => {window.open("https://www.google.com/maps?q=" + item.latitude + "," + item.longitude , "_blanck")}}>Locate</Button>
                    </Flex> 
                </Card>
            </Flex>
            ))}
        </div>
    </Flex>
    )
}