import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const firstRenderDone = useRef(false)

  useEffect(() => {
    console.log('effect')
    if (firstRenderDone.current === true) {
  axios
    .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(response => {
      console.log('promise fulfilled')
      console.log(response.data)
      const country = { 
        found: true,
        data: {
          capital: response.data[0].capital[0],
          population: response.data[0].population,
          flag: response.data[0].flags.png,
          name: response.data[0].name.common
        }
      }
      setCountry(country)
    })
    .catch(error => {
      const notFound = {
        found: false
      }
      setCountry(notFound)
    })
  }
  else { firstRenderDone.current = true }
  }, [name]) 

  return country
}

const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    return null
  }
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)


  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App