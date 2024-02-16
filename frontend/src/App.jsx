import { useState, useEffect } from 'react'
import { Card, Space, Divider, Button, Flex, Breadcrumb, Layout, Menu, theme, Table } from 'antd'
import {
  DesktopOutlined,
  FileOutlined,
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
  const [collapsed, setCollapsed] = useState(false)

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


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{minHeight: '110vh', margin: 0, padding: 0, color: 'black'}}>

      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={sideBarItems} style={{paddingTop:'1vw'}}/>
      </Sider>

      <Layout collapsed={collapsed} style={{width: collapsed ? '95.5vw' : '88.5vw',}}>
        <Header style={{padding: '.5vw', background: colorBgContainer,}}> 
          <Flex justify='center' align='center'>
            Accountability
          </Flex>
        </Header>

        <Flex vertical={true}>
          <div>
            Boo
          </div>
          


        </Flex>




        <Content style={{margin: '0 16px',}}>
          <Breadcrumb style={{margin: '16px 0',}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG}}>
            Bill is a cat.
          </div>
        </Content>

        <Footer style={{textAlign: 'center',}}>
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