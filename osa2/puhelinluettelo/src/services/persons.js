import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNew = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const removeName = (id) =>  {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response =>response.data)
}

const changeNumber = (changedNameObject) =>    {
    console.log('terveiset personsista ', changedNameObject)
    const request = axios.put(`${baseUrl}/${changedNameObject.id}`, changedNameObject)
    
    return request.then(response => response.data)
}

const personService = { getAll, addNew, removeName, changeNumber }

export default personService