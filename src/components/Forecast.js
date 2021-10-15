import React, { useState } from "react"

const Forecast = (props) => {
    
    return (
        <div className="center"> 
            <h1>5 day forecast</h1>
            <button onClick={props.getLocation}>Get location</button>
            <button onClick={props.get5DayForecast}>Get 5 day forecast</button>
            <div>
                {props.forecast.map((forecastObject) => (
                    <div key={forecastObject.dt}>
                        <h2>Date: {forecastObject.dt_txt}</h2>
                        <p>The temperature will be: {forecastObject.main.temp} degrees</p>
                        <img src={"http://openweathermap.org/img/wn/" + forecastObject.weather[0].icon + ".png"} />
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default Forecast;