import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNew = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  try{
  const response = await axios.post(baseUrl, newObject, config)
  console.log('addNew response ', response)
  return response.data
  }
  catch(exeption) {
    throw(exeption)
  }
}

const exports = { getAll, addNew, setToken }

export default exports