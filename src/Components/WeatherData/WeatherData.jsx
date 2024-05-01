import React, { useState } from "react";
import "./Beautify.css";

import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import humidityIcon from "../Assets/humidity.png";
import rainIcon from "../Assets/rain.png";
import searchIcon from "../Assets/search.png";
import snowIcon from "../Assets/snow.png";
import windIcon from "../Assets/wind.png";

const WeatherData = () => {
  let api_key = "6191e1af7bbfbea7be02d33da3918d6d";

  const [wicon, setWicon] = useState("");
  const [location, setLocation] = useState("");
  const [cityIocns, setCityIcons]=useState(false)

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      alert("Enter a Valid City name");
      return 0;
    }
    setCityIcons(true)

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    console.log(data);

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data?.wind?.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data?.main.temp) + "&#176" + "C";
    setLocation((location[0].innerHTML = data.name));

    console.log(humidity[0]);

    if (data?.weather[0]?.icon === "01d" || data?.weather[0]?.icon === "01n") {
      setWicon(clearIcon);
    } else if (
      data?.weather[0]?.icon === "02d" ||
      data?.weather[0]?.icon === "02n"
    ) {
      setWicon(cloudIcon);
    } else if (
      data?.weather[0]?.icon === "03d" ||
      data?.weather[0]?.icon === "03n"
    ) {
      setWicon(drizzleIcon);
    } else if (
      data?.weather[0]?.icon === "04d" ||
      data?.weather[0]?.icon === "04n"
    ) {
      setWicon(drizzleIcon);
    } else if (
      data?.weather[0]?.icon === "09d" ||
      data?.weather[0]?.icon === "09n"
    ) {
      setWicon(rainIcon);
    } else if (
      data?.weather[0]?.icon === "10d" ||
      data?.weather[0]?.icon === "10n"
    ) {
      setWicon(rainIcon);
    } else if (
      data?.weather[0]?.icon === "13d" ||
      data?.weather[0]?.icon === "13n"
    ) {
      setWicon(snowIcon);
    } else {
      setWicon(clearIcon);
    }
  };

  return (
    <div className="container" >
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Enter City Name"
        />
        <div className="search-icon" onClick={search}>
          <img src={searchIcon} alt="Search"  className="search"  />
        </div>
      </div>

      <div className="weather-image">
        {wicon ? <img src={wicon} alt="Cloud"  /> : ""}
      </div>

      <div className="weather-temp"></div>
      <div className="weather-location"></div>

      <div className="data-container">
        <div className="element">
        {location?<img src={humidityIcon} alt="Humidity" className="icon" />:''}
          
          <div className="data">
            <div className="humidity-percent"></div>
            <div className="text"></div>
          </div>
        </div>
        <div className="element">
          {location?<img src={windIcon} alt="Wind" className="icon" />:''}
          <div className="data">
            <div className="wind-rate"></div>
            <div className="text"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
