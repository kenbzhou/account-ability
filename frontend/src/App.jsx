import { useState, useEffect } from 'react'
import { Card, Space, Divider, Button, Flex } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';

import commitmentService from './services/commitments'
import './App.css'

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



const App = () => {
  const [entries, changeEntries] = useState([])

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


  return (
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
  )
}
export default App
