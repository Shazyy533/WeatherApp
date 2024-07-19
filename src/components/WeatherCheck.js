import React, { useState } from 'react';
import axios from 'axios';
import './WeatherCheck.css';

const WeatherCheck = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '82741c25a4854db3b2a115232240406'; 

  const fetchWeather = async () => {
    try {
      const weatherInfo = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
      console.log(weatherInfo.data); 
      setWeather(weatherInfo.data);
      // weatherInfo.save();
      setError(null);
    } catch (err) {
      console.error(err);
      setError('City not found');
      setWeather(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <>
    <h1>Weather App</h1>
    <div className="weather-component">
      <div>
        
        <input
          className="weather-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter City..."
        />
      </div>
      <button onClick={fetchWeather} className='Weather-btn'>Get Weather</button>

      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather-info">
          <h2 style={{fontWeight:'bold',fontSize:'40px'}}>{weather.location.name}</h2><br/>
          <p>Temperature: {weather.current.temp_c}°C</p><br/>
          <p>Temperature: {weather.current.temp_f}°F</p><br/>

          <p>Weather: {weather.current.condition.text}</p><br/>
          <p>Humidity: {weather.current.humidity}%</p><br/>
          <p>Wind Speed: {weather.current.wind_kph} kph</p>
        </div>
      )}
    </div>
    </>

  );
};

export default WeatherCheck;
