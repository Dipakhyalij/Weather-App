import React, { useState, useEffect, useRef } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import drizzelIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainhIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'
import cloudyIcon from '../assets/cloud.png'

const Weather = () => {

const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(null)

  // FIX 2: correct icon keys
  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudyIcon,
    "02n": cloudyIcon,
    "03d": cloudyIcon,
    "03n": cloudyIcon,
    "04d": drizzelIcon,
    "04n": drizzelIcon,
    "09d": rainhIcon,
    "09n": rainhIcon,
    "10d": rainhIcon,
    "10n": rainhIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }

  const search = async (city) => {
    if(city==="") {alert("please enter city name");
      return;
    } 
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url)
      const data = await response.json()

      if(!response.ok){
        alert(data.message);
        return;
      }

      // FIX 3: weather (lowercase)
      const icon = allIcons[data.weather[0].icon] || clearIcon

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    } catch (error) {
     setWeatherData(false);
     console.log("error occurred in featching data", error)
    }
  }

  useEffect(() => {
    search("mumbai")
  }, [])

  return (
    <div className='weather'>
      <div className="search">
        <input ref={inputRef} type='text' placeholder='search' />
        <img src={searchIcon} onClick={()=>search(inputRef.current.value)} alt="" />
      </div>
      {/* FIX 4: render only when data exists */}
      {weatherData?
        <>

          <img src={weatherData.icon} alt="" className='weather-icon' />
          <p className='temp'>{weatherData.temperature}°c</p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={windIcon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
    :<p>Loading.....please wait 
      we are facing error in the API call
    </p> 
      }
      <div className='py-8 bg-dark-300 '>
      <div className="container mx-auto px-6 text-center">
        <p className='text-gray-400'>@2026 Created by Dipak Hyalij. All rights reserved.</p>
      </div>

    </div>
      </div>
  )
}

export default Weather
