import { useState, useEffect } from 'react'
import commitmentService from './services/commitments'
import './App.css'

const USER = 'kenbzhou'

const Entry = ({entry}) => {
  return(
    <li className='entry'>
      {entry.title}
      {entry.date}
    </li>
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
      {entries.map(entry => <Entry entry={entry}/>)}
    </div>
  )
}
export default App
