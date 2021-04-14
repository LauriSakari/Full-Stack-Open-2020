
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Weather from './components/Weather'


const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

 const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('effect fulfilled')
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    let value = event.target.value.toUpperCase()
    setFilteredCountries(countries.filter(country => country.name.toUpperCase().includes(value)))
    
  }

  const handleButton = (props) =>  {
    let loput = filteredCountries.filter(country => country.name.includes(props) )
    setFilteredCountries(loput)
  }

  return (
    <>
      <div>
      <h1>Maiden tiedot</h1>
      </div>

      Filter: <input onChange={handleFilterChange}/>
     
        <Country 
          handleButton={handleButton}
          filter={filter}
          filteredCountries={filteredCountries}
          />

        <div>
          {filteredCountries.length === 1 ? (
        <Weather 
          filteredCountries = {filteredCountries}
          apiKey = {apiKey}
        />) : (
        null
         ) }
        </div>
    </>    
   )

}

export default App;