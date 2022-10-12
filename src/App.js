import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
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
      <input type="search" placeholder="Type a city" onChange={showCity} />
      <input type="submit" value="Search" />
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
      <div className="text-center">
        {form}
        <ul className="myList mt-4">
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
