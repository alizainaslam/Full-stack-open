import React from "react";

const Weather = ({ displayInfo, weatherInfo }) => {
  return (
    <div className="flex flex-col px-5 pb-5">
      <p className="font-bold">
        Weather:{" "}
        <span className="text-md font-normal">
          {(weatherInfo.temp - 273.15).toFixed(1)}°C
        </span>
      </p>
      <p className="font-bold">
        Wind:{" "}
        <span className="text-md font-normal">{weatherInfo.wind}m/s</span>
      </p>
    </div>
  );
};

export default Weather;
