import React from "react"

const Temperature = (props) => {
    return (
    <div className="App">
        <h1>Current temperature page</h1>
        <button onClick={props.getLocation}>Get location</button>
        <button onClick={props.getWeather}>Get weather</button>
        <h2>The temperature is now: {props.temperature ? props.temperature : "click buttons"} degrees</h2>
    </div>
    )
}

export default Temperature;