import { Avatar } from 'antd';
import "../styles/dashboard.css"
import img from "../assets/image1.jpg"
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { SignalFilled } from "@ant-design/icons";
import { DingtalkOutlined , PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
//New
import { Button, Card, Flex, Image, Modal, Input, Typography, Spin , Upload} from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const { TextArea } = Input;
const { Text } = Typography;
const { Meta } = Card;

export function ProfileInfo() {
    const [expanded, setExpanded] = useState(false);
    const [change, setChange] = useState<number>(0);
    const [data, setData] = useState([])
    const [totalIncidents, setTotalIncidents] = useState([])
    // New
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    
    //File Upload
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // Socket State
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [imageURL, setimageURL] = useState<string | null>(null);
    const [imageData, setImageData] = useState<string | null>(null);

    const email = useAppSelector(state => state.user.email);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    // const handleUpload = async (e : any) => {
    //     const uploadedFile = e.target.files[0];
    //     try {
    //         const formData = new FormData();
    //         formData.append('photo', uploadedFile);
    
    //         const response = await fetch('https://image-upload-nq2i.onrender.com/upload', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Error uploading file');
    //         }
    
    //         const responseData = await response.json();
    //         setimageURL(responseData.signedUrl);
    //     } catch (error) {
    //         console.error('Error uploading file:', error);
    //     }
    // };
    

    const sendMessage = (data : any) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            try {
                const message = JSON.stringify(data);
                console.log(message);
                socket.send(message);
            } catch (error) {
                console.error("Error sending message:", error);
            }
        } else {
            console.error("WebSocket connection not established.");
        }
    };

    useEffect(() => {
        const newSocket = new WebSocket('ws://ec2-13-201-123-112.ap-south-1.compute.amazonaws.com:4000/');
        newSocket.onopen = () => {
            console.log('Connection established')
            newSocket.send(JSON.stringify({"message": "Hello Server"}));
        }
        newSocket.onmessage = (message) => {
            console.log('Message received:', message.data);
        }
        setSocket(newSocket);
        return () => newSocket.close();
    }, [])

    useEffect(() => {
        console.log("Image URL", imageURL);
        console.log("Sending Data");
        sendMessage({email: email, image: JSON.stringify(imageURL), latitude: "123.333232", longitude: "122.34342"});
    }, [imageURL]); 

    async function TotalIncidentsReported() {
        let data = await fetch("http://ec2-13-201-123-112.ap-south-1.compute.amazonaws.com:3000/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        let res = await data.json();
        console.log(res)
        setTotalIncidents(res.posts);
    }

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
            TotalIncidentsReported();
            console.log("Data has been set")
        }
        console.log("in use effect", data)
    }, [email, change])


    // Upload Image Related
    // const uploadFile = async (file: any) => {
    //     const formData = new FormData();
    //     formData.append('photos', file);
    
    //     try {
    //       const response = await fetch('http://ec2-13-126-223-141.ap-south-1.compute.amazonaws.com:4000/upload', {
    //         method: 'POST',
    //         body: formData
    //       });
    //       const data = await response.json();
    //       console.log("data" , data.data.imageName)
    //       let ok = JSON.stringify(data.data.imageName);
    //       console.log("ok" ,ok)
    //       setImageData(ok)
    //     } catch (error) {
    //       console.error('Error uploading file:', error);
    //     }
    //   };
    
      const handleUpload = async (file: any) => {
        try {
            const formData = new FormData();
            formData.append('photo', file);

            console.log("handleUpload" , file);
            console.log("formData" , formData)
            const response = await axios.post('http://ec2-43-204-100-197.ap-south-1.compute.amazonaws.com:3000/upload', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // if (!response.ok) {
            //     throw new Error('Error uploading file');
            // }
    
            const responseData = await response.data;
            setimageURL(responseData);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

      let faFile: any;
    
      if (fileList.length > 0) {
        faFile = fileList[0].originFileObj;
      }


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
    
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
      };
    
      const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    
      const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      );

      const handleModalClose = () => {
        setModal2Open(false);
      };
    
      const handleModalClose2 = () => {
        setModal3Open(false);
      };

    const Modal1 = () => (
        loading ? (
            <Modal
                centered
                visible={modal3Open}
                onCancel={handleModalClose2}
            >
                <Flex align="center" justify='center' style={{ height: "30vh" }} gap="middle">
                    <Spin size="large" />
                </Flex>
            </Modal>
        ) : (
            <Modal
                centered
                visible={modal2Open}
                onCancel={handleModalClose}
                style={{ height: "100vh", width: "3000px", display: "flex" , marginTop : "200px" }}
                okButtonProps={{ style: { backgroundColor: "rgb(234, 230, 0)" , color : "black" , display : "none" } }} // Change the background color of the OK button
                cancelButtonProps={{ style: { backgroundColor: "#yourColor" } }}
            >
                <div style={{ width: 700 }}>
                    <Flex justify='center' style={{ marginBottom: "10px" }}>
                        <DingtalkOutlined style={{ fontSize: "50px", color: "rgb(234, 230, 0)" }} />
                    </Flex>
                    <Flex justify='center' style={{ marginBottom: "20px" }} vertical>
                        <h1 style={{ fontSize: "30px", display: "flex", alignContent: 'center', justifyContent: "center" }}>Report An Incident</h1>
                    </Flex>
                    <Flex align="center" justify="center" style={{ marginTop: "20px", marginLeft: "-10px" }}>
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Flex>
                    <Flex align="center" justify="center">
            <Button type='primary' style={{ backgroundColor: "#0015f6c1", marginTop: "10px", width: "40%" }} onClick={async () => {
              await handleUpload(faFile);
            }}>Submit</Button>
          </Flex>
                </div>
            </Modal>
        )
    );

    return (
        <div>
            <Flex align='center' justify="space-between" style={{ width: "75vw" }}>
                <Card
                    hoverable
                    style={{ width: 360, height: 290, borderRadius: "20px", backgroundColor: "#ebda55f3", border: "none" }}
                >
                    <Typography.Title level={4} style={{ marginTop: "10px" }}>Incident Reported</Typography.Title>
                    <Flex align='center' justify='center'>
                        <Typography.Title level={1} style={{ fontSize: "50px", marginTop: "47px" }}>{JSON.stringify(data ? data.length : 0)}</Typography.Title>
                    </Flex>
                </Card>

                <Card
                    hoverable
                    style={{ width: 360, height: 290, borderRadius: "20px", backgroundColor: "#ebda55f3", border: "none", overflow: "hidden", position: "relative" }}
                    cover={<img alt="example" src={img.src} style={{ width: "100%", height: 291, objectFit: "cover" }} />}
                >
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                        <Typography.Title level={1} style={{ textShadow: "0 0 10px black", fontSize: "50px", zIndex: "100", color: "white" }}>Post in 1 click</Typography.Title>
                    </div>
                </Card>

                <Card
                    hoverable
                    style={{ width: 360, height: 290, borderRadius: "20px", backgroundColor: "#ebda55f3", border: "none" }}
                >
                    <Typography.Title level={4} style={{ marginTop: "10px" }}>Incident Count</Typography.Title>
                    <Flex align='center' justify='center'>
                        <Typography.Title level={1} style={{ fontSize: "50px", marginTop: "47px" }}>{JSON.stringify(totalIncidents ? totalIncidents.length : 0)}</Typography.Title>
                    </Flex>
                </Card>
            </Flex>

            <Flex align='center' justify="center" style={{ width: "75vw", marginTop: "30px" }}>
                <Card
                    hoverable
                    style={{ width: 360, height: 290, borderRadius: "20px", border: "none" }}
                    className='cardStyle'
                >
                    <Flex align='center' justify='space-between'>
                        <Avatar
                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 55, xxl: 90 }}
                            icon={<SignalFilled />}
                            style={{ color: "rgb(234, 230, 0)", marginTop: "7px" }}
                        />
                        <Typography.Title level={4} style={{ marginTop: "10px", color: "white" }}>Report Incident</Typography.Title>
                    </Flex>

                    <Flex align='center' justify='center'>
                        {/* <Typography.Title level={1} style={{ fontSize: "50px", marginTop: "47px", color: "white" }}>{JSON.stringify(data.length)}</Typography.Title> */}
                        <Card
                            hoverable
                            style={{ width: 100, height: 60, borderRadius: "10px", marginTop: "40px", border: "2px solid gray" }}
                            className='cardStyle'>
                            <Flex onClick={() => {setModal2Open(true)}} align='center' justify='center'>
                                <Typography.Text  style={{ color: "white", fontSize: "18px", fontWeight: 600, marginTop: "-10px" }}>Add</Typography.Text>
                            </Flex>
                        </Card>
                    </Flex>
                </Card>
            </Flex>
            {Modal1()}
        </div>
    )
}