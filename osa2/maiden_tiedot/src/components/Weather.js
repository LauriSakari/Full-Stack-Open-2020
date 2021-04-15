import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {  
    
    const [currentWeather, setCurrentWeather] = useState(null)
    

    const key = props.apiKey
    const capital = props.filteredCountries[0].capital

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=${capital}`)
        .then(response => {
            setCurrentWeather(response.data)
        })
    }, [key, capital])
    
    return (
    <div>   
        {currentWeather !== null ?
        <>
        <h2>Weather in {currentWeather.location.name}</h2>
        <p>Temperature: {currentWeather.current.temperature} Celcius</p>
        <img src={currentWeather.current.weather_icons[0]} alt='weaher icon'/> 
        <p>Wind: {currentWeather.current.wind_speed} km/h direction {currentWeather.current.wind_dir}</p>
        </>
        : <p>loading weather</p>}
    </div>
    
    )
}    

export default Weather