import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = (props) => {
  const tulostettavat = props.filteredCountries.map(country =>
    <p key={country.name}>{country.name} {<button onClick={() => props.handleButton(country.name)} > Show </button>}</p> )
    
    if (props.filteredCountries.length === 0 && props.filter.length > 0) {
      return (
      <div>
        <p>Hakuehdoillasi ei löytynyt tuloksia</p>
      </div>
      )
    } else if (tulostettavat.length === 0 || props.filteredCountries.length === 0
      || props.filter.length === 0) {
      return (
        <div>
        <p>Syötä maan nimi</p>
        </div>
      ) 
    }  else if (tulostettavat.length > 10)  {
      return       <div>
      <p>Tarkenna hakua</p>
    </div>
    }
    
    else if (props.filteredCountries.length === 1) {

      return (  
        <div>
          {props.filteredCountries.map(country => 
            <div key={country.name}> 
              <h2>{country.name} </h2>
              <p>Capital: {country.capital} </p>
              <p>Population: {country.population } </p> 
            </div>)}
          <h2>Languages</h2>
          <ul>
           {props.filteredCountries[0].languages.map(language =>
             <li key={language.name}>{language.name}</li>
            )}
          </ul>
  
           <img src={props.filteredCountries[0].flag} alt='flag' height={200} />
        </div>
      )
    }

    return <div>{tulostettavat}</div>

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
    <div>
      <div>
      <h1>Maiden tiedot</h1>
      </div>

      Filter: <input onChange={handleFilterChange}/>
    
      
        <Country 
          handleButton={handleButton}
          filter={filter}
          filteredCountries={filteredCountries}
          />
    </div>
   )
}

export default App;