import React from "react";

const CountryDetail = ({ displayInfo }) => {
  return (
    <div key={displayInfo.cca3}>
      <h1>{displayInfo.name.common}</h1>
      <p>Capital: {displayInfo.capital}</p>
      <p>Area: {displayInfo.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(displayInfo.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={Object.values(displayInfo.flags)[0]} alt="flag" className="w-[300px] h-[100px]"/>
    </div>
  );
};

export default CountryDetail;
