import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

export const Forecast = ({ weather }) => {
  const { data } = weather;
  console.log(data,"data")
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertToFahrenheit = (temperature) =>
    Math.round((temperature * 9) / 5 + 32);

  const renderTemperature = (temperature) => {
    return isCelsius
      ? Math.round(temperature)
      : convertToFahrenheit(temperature);
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.name}, <span>{data.sys.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <div className="temp">
        {data.weather[0].icon && (
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="temp-icon"
          />
        )}
        {renderTemperature(data.main.temp)}
        <span className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </span>
      </div>
      <p className="weather-des">{data.weather[0].description}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40" />
          <div>
            <p className="wind">{data.wind.speed} m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40" />
          <div>
            <p className="humidity">{data.main.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>

    </div>
  );
};
