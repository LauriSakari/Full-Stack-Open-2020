import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = (props) =>  {
  console.log('Countries ', props)
  if (props.filteredCountries.length === 0 && props.filter.length > 0) {
    return (
    <div>
      <p>Hakuehdoillasi ei löytynyt tuloksia</p>
    </div>
    )
  } else if (props.filteredCountries.length > 10 && props.filter.length > 0) {
    return (
      <div>
        <p>Tarkenna hakua</p>
      </div>
    )
  } else if (props.countries.length === 0 || props.filteredCountries.length === 0
    || props.filter.length === 0) {
    return (
      <div>
      <p>Syötä maan nimi</p>
      </div>
    ) 
  } else if (props.filteredCountries.length === 1) {

    return (  
      <div>
        {props.filteredCountries.map(country => 
          <div key={country.name}> 
            <h2>{country.name} </h2>
            <p>Capital: {country.capital} </p>
            <p>Population: {country.population } </p> 
          </div>)}
        <ul>
         {props.filteredCountries[0].languages.map(language =>
           <li key={language.name}>{language.name}</li>
          )}
        </ul>

         <img src={props.filteredCountries[0].flag} alt='flag' height={200} />
      </div>
    )
  }
  
  else {
    return (
      <div>
      {props.filteredCountries.map(country => 
        <div key={country.name}>
        <p > {country.name}  
        <button >
          Show
        </button>
        </p>
        </div>)}
      </div>
  )
  }
}

const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('effect fulfilled')
      setCountries(response)
      console.log('countries setted as response')
      setCountries(response)
    })
  }, [])

  console.log(countries)

  const handleFilterChange = (event) => {
    console.log('handle filter ', event.target.value)
    setFilter(event.target.value)
    let value = event.target.value.toUpperCase()
    setFilteredCountries(countries.data.filter(country => country.name.toUpperCase().includes(value)))
  }
  
console.log('filtered countries ', filteredCountries)
console.log('countries ulkona ', countries)
  

  console.log('filter ulkona ', filter)

  return (
    <div>
      <div>
      <h1>Moi, tämä on maiden tiedot appi!</h1>
      </div>

      Filter: <input onChange={handleFilterChange}/>
     
      <Countries countries = {countries}
      filteredCountries = {filteredCountries}
      filter = {filter}/>
      
    
    </div>
  );
}

export default App;
