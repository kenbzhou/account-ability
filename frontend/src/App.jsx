import { useState, useEffect } from 'react'
import { Card, Space, Divider, Button, Flex, Breadcrumb, Layout, Radio} from 'antd'
import { DownloadOutlined, PlusCircleOutlined, FilterOutlined, ReconciliationOutlined} from '@ant-design/icons';
import commitmentService from './services/commitments'
import MenuSidebar from './components/sidebar'
import './App.css'

const { Header, Content, Footer, Sider } = Layout
const USER = 'kenbzhou'
const TODAYS_DATE = (new Date().toISOString().slice(0, 10))

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





const CommitmentCard = ({entry}) => {
  console.log(entry)
  return(
    <Card className = 'commitmentCard' title = {entry.title}>
      <p> {entry.description ? entry.description : null} </p>
    </Card>
  )
}



const App = () => {
  const [entries, changeEntries] = useState([])
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    commitmentService
      .getAllUserbyDate(USER, TODAYS_DATE)
      .then(userNotes => {
        changeEntries(userNotes)
        console.log(userNotes)
      }
        )
    }, 
  [])


  return (
    <Layout className="dailyPageBody" style={{height: '100vh', margin: 0, padding: 0, color: 'black', }}>
      <MenuSidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Layout collapsed={collapsed} style={{width: collapsed ? '95.5vw' : '88.5vw',}}>
        <Header style={{height:'5vh', padding: '.1vw', background: 'WhiteSmoke',}}> </Header>
        <Flex>
          <Flex vertical={true} style={{marginLeft:'4vw', height: '90vh', width: '60vw'}}>
            <Flex style={{background: 'WhiteSmoke'}}>
              <h1 style={{}}>
                Commitments
              </h1>
              <Flex justify="flex-end" align="center" gap="middle" style={{flex:1}}> 
                <Button type="primary" shape="round" icon= {<ReconciliationOutlined />} size='large'style={{background: 'GoldenRod'}}> Toggle </Button>
                <Button type="primary" shape="round" icon={<FilterOutlined/>} size='large' style={{background: 'RoyalBlue'}}> Filter </Button>
              </Flex>
            </Flex>
            <p style={{marginTop:'-2.5vh'}}>
              Feburary 16th, 2024
            </p>
            <Flex vertical style={{background:'WhiteSmoke', height: '100%', overflow: 'auto'}}>
              {entries.map(entry => <CommitmentCard entry={entry}/>)}
            </Flex>
          </Flex>

          <Flex vertical={true} style={{marginLeft: '3vw', padding: '1%', height: '90vh', width: '40vw', alignContent: 'center'}}>
              <Card style={{margin:'0.5%', height:'15vw', background:'RoyalBlue'}}>
                <Flex style={{fill:1, height:'13vw'}}>
                  <Card style={{width:'30%', height:'100%'}}> Woah </Card>
                  <Card style={{width:'70%', height:'100%', marginLeft:'5%'}}> Zoinks</Card>
                </Flex>
              </Card>
              <Card style={{margin:'0.5%', marginTop:'1%', height:'30vw'}}>
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