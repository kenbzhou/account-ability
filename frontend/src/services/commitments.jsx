import axios from 'axios'
const baseURL = '/api/entry'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const getAllUser = (user) => {
  //console.log(`getAllUser called with ${user} as input`)
  //console.log(`calling axios.get with ${baseURL}/${user} as input`)
  const request = axios.get(`${baseURL}/users/${user}`)
  //console.log(request)
  return request.then(response => response.data)
}

const getAllUserbyDate = (user, date) => {
  const request = axios.get(`${baseURL}/users/${user}/${date}`)
  return request.then(response => response.data)
}

const deleteEntry = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(response => response.data)
}

const createEntry = (id, newEntry) => {
  const request = axios.post(baseURL, newEntry)
  return request.then(response => response.data)
}

const updateEntry = (id, updatedEntry) => {
  const request = axios.put(baseURL, updatedEntry)
  return request.then(response => response.data)
}

export default {getAll, getAllUser, deleteEntry, createEntry, updateEntry, getAllUserbyDate}