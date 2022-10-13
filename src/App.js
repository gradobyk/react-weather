import React, { useState } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  
  const [city, setCity] = useState("");
  const [show, setShow] = useState("");
  const [data, setData] = useState("");

  function showWeather(response) {
    setShow(true);
    setData({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function showCity(event) {
    setCity(event.target.value);
  }
  
  let form = (
    <form onSubmit={handleSubmit}>
      <div className="row mt-2">
        <div className="col-9">
          <input
            className="seacheForm"
            type="search"
            placeholder="Type a city"
            onChange={showCity}
          />
        </div>
        <div className="col-3">
          <input className="btn btn-primary" type="submit" value="Search" />
        </div>
      </div>
    </form>
  );

  let weatherDesc = [
    `Temperature: ${Math.round(data.temperature)}°C`,
    `Description: ${data.description}`,
    `Humidity: ${data.humidity} %`,
    `Wind: ${data.wind} km/h`,
    <img src={data.icon} alt={data.description} />,
  ];

  if (show) {
    return (
      <div>
        {form}
        <ul className="">
          {weatherDesc.map(function (counAll) {
            return <li>{counAll}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return form;
    
  }
}



