import { useState, useEffect } from 'react'
import { Card, Space, Divider, Button, Flex, Breadcrumb, Layout, Menu, theme, Table, Avatar, Calendar, Progress } from 'antd'
import {
  DesktopOutlined,
  AntDesignOutlined,
  HistoryOutlined,
  CalendarOutlined,
  UserOutlined,
  ScheduleOutlined,
  TableOutlined,
  InsertRowAboveOutlined,
} from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';

import commitmentService from './services/commitments'
import './App.css'

const { Header, Content, Footer, Sider } = Layout
const USER = 'kenbzhou'

const EntryCard = ({entry}) => {
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => (setIsHovered(true))
  const handleMouseLeave = () => (setIsHovered(false))
  return(
    <Card className='displayedEntry' 
          title={entry.title}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >
      <p style={{color: isHovered ? "LightGrey" : "black"}}> {entry.date} </p>
      {isHovered ? (<Flex gap='middle' className='buttonContainer'>
        <Button type="primary" shape="round" icon={<DownloadOutlined/>} onClick={() => {console.log("Accomplish")}}></Button>
        <Button type="primary" shape="round" icon={<DownloadOutlined/>} onClick={() => {console.log("Renounce")}}></Button>
        <Button type="primary" shape="round" icon={<DownloadOutlined/>} onClick={() => {console.log("Defer")}}></Button>
      </Flex>) : <div></div>}
      <Flex justify="flex-end" align="flex-end" gap="small">
        <Button type="dashed" shape="round" icon={<DownloadOutlined/>} onClick={() => {console.log("Accomplish")}}></Button>
        <Button type="dashed" shape="round" icon={<DownloadOutlined/>} onClick={() => {console.log("Accomplish")}}></Button>
      </Flex>
    </Card>
  )
}
function getItem(label, key, icon, children) {
  return {key, icon, children, label}
}
const sideBarItems = [
  getItem('Profile', 'sub1', <UserOutlined />),
  getItem('Calendar', 'sub2', <CalendarOutlined/>, [
    getItem('Daily', 'sub3', <ScheduleOutlined/>),
    getItem('Weekly', 'sub4', <InsertRowAboveOutlined/>),
    getItem('Monthly', 'sub5', <TableOutlined/>)
  ]),
  getItem('History', 'sub6', <HistoryOutlined/>)



]



const App = () => {
  const [entries, changeEntries] = useState([])
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    commitmentService
      .getAllUser(USER)
      .then(userNotes => {
        changeEntries(userNotes)
        console.log(userNotes)
      }
        )
    }, 
  [])


    /*


    */



  return (
    <Layout className="dailyPageBody" style={{height: '100vh', margin: 0, padding: 0, color: 'black', }}>
      <Sider theme="dark" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{background:"RoyalBlue"}}>
        <Flex justify={'center'} align={'center'} style={{paddingTop: '1vw'}}>
            <Avatar size={{ xs: 24, sm: 28, md: 32, lg: 54, xl: 60, xxl: 60}} icon={<AntDesignOutlined/>}/>
          </Flex>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={sideBarItems} style={{paddingTop:'1vw', background:"RoyalBlue"}}/>
      </Sider>

      <Layout collapsed={collapsed} style={{width: collapsed ? '95.5vw' : '88.5vw',}}>
        <Header style={{height:'5vh', padding: '.1vw', background: 'WhiteSmoke',}}> </Header>
        <Flex>
          <Flex vertical={true} style={{marginLeft:'1.5vw', height: '85vh',  background: 'white', width: '60vw', background: 'WhiteSmoke'}}>
            <h1 style={{}}>
              Commitments
            </h1>
            <p style={{marginTop:'-2.5vh'}}>
              Feburary 16th, 2024
            </p>
            <Flex vertical style={{background:'WhiteSmoke', minHeight: '97%', overflow: 'auto'}}>
              <Card className="commitmentCard"> Hello </Card>
              <Card style={{width: '100%', minHeight: '20%', marginTop: '1%'}}> Hello </Card>
              <Card style={{width: '100%', minHeight: '20%', marginTop: '1%', background: 'White'}}> Hello </Card>
              <Card style={{width: '100%', minHeight: '20%', marginTop: '1%', background: 'White'}}> Hello </Card>
              <Card style={{width: '100%', minHeight: '20%', marginTop: '1%', background: 'White'}}> Hello </Card>
            </Flex>
            <Flex style={{minHeight: '3%', background:'Red'}}>
              Hi
            </Flex>

          </Flex>

          <Flex vertical={true} style={{margin: '1vh', padding: '1%', height: '85vh',  background: 'white', width: '40vw', alignContent: 'center', background: 'Red'}}>
              <Card style={{margin:'0.5%', height:'15vw'}}>
                <h3>
                  Progress Today
                </h3>
                
              </Card>
              <Card style={{margin:'0.5%', height:'30vw'}}>
                <h2>
                  Accomplishments
                </h2>
                
              </Card>
              <Card style={{margin:'0.5%', height:'10vw', width:'10vw'}}>
                
              </Card>

          </Flex>
        </Flex>



        <Footer style={{marginTop: '3.45vh', textAlign: 'center', background:'WhiteSmoke'}}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>

    </Layout>
  )
}
export default App


/*

 <div>
      <Divider className='topBar'/> 
      <Space direction = "vertical" size="middle" style={{display: 'flex'}}>
        {entries.map(entry => {
          return(
          <EntryCard entry={entry}/>
          )
        })}
      </Space>
    </div>

*/