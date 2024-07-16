import React from "react";

const Weather = ({ displayInfo, weatherInfo }) => {
  return (
    <div>
      <h1>Weather in {displayInfo.name.common}</h1>
      <p>{(weatherInfo.temp - 273.15).toFixed(1)} °C</p>
      <p>wind: {weatherInfo.wind} m/s</p>
    </div>
  );
};

export default Weather;
