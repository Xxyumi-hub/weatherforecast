import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,  
  Link
} from "react-router-dom";
import Temperature from './components/Temperature';
import Forecast from './components/Forecast';
import Home from "./components/Home";

function App() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [temperature, setTemperature] = useState('')
  const [forecast, setForecast] = useState([])

  const getLocation = async(e) => {
    try {
      navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = Math.round(position.coords.latitude)
      const longitude = Math.round(position.coords.longitude)
      setLatitude(latitude)
      setLongitude(longitude)
      console.log("Latitude is :", latitude);
      console.log("Longitude is :", longitude);
    });
  } catch(error) {
    console.error('Please allow location access, check the console for more information ', error)
  }
  }

  const getWeather = async(e) => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`
    
    try {
      const response = await axios.get(url)
      console.log(response.data) //object
      console.log(response.data.main.temp) //string of temp in F
      const currentTemp = response.data.main.temp
      setTemperature(currentTemp)
    }
    catch(error) {
      console.error('There was an error:', error)
    }
  }

  const get5DayForecast = async(e) => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`

    try {
      const response = await axios.get(url)
      console.log(response.data.list)
      setForecast(response.data.list) //array of objects
    }
    catch(error) {
      console.error('There was an error: ', error)
    }
  }


  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/temperature">Current Temperature</Link>
        </li>
        <li>
          <Link to="/forecast">5 day Forecast</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/temperature">
          <Temperature temperature={temperature} getLocation={getLocation} getWeather={getWeather}/>
        </Route>
        <Route path="/forecast">
          <Forecast getLocation={getLocation} get5DayForecast={get5DayForecast} forecast={forecast}/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
