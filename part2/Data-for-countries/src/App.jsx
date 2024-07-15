import React, { useEffect, useState } from "react";

const App = () => {
  const someKey = import.meta.env.VITE_SOME_KEY;

  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [filteredQuery, setFilteredQuery] = useState([]);
  const [displayInfo, setDisplayInfo] = useState(null);

  // Country API call
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        } else {
          const jsonResponse = await response.json();
          setApiResponse(jsonResponse);
        }
      } catch (error) {
        console.log(`Error : ${error}`);
      }
    };
    fetchCountries();
  }, []);

  // Weather API call
  const fetchWeather = async (userQuery) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userQuery}&APPID=${someKey}`
      );
      if (!weatherResponse.ok) {
        throw new Error(weatherResponse.status);
      } else {
        const jsonResponse = await weatherResponse.json();
        const finelTemp = jsonResponse.main.temp;
        const finelSpeed = jsonResponse.wind.speed;
        setDisplayInfo((prevInfo) => ({
          ...prevInfo,
          temp: finelTemp,
          wind: finelSpeed,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleUserInput(e) {
    const userQuery = e.target.value;
    setUserInput(userQuery);
    handleFilterQuery(userQuery);
    if (userQuery === "") {
      setDisplayInfo(null);
    }
    setTimeout(() => {
      fetchWeather(userQuery);
    }, 2000);
  }

  function handleFilterQuery(userQuery) {
    if (userQuery === "") {
      setFilteredQuery([]);
    } else {
      const filter = apiResponse.filter((filteredItem) =>
        filteredItem.name.common.toLowerCase().includes(userQuery.toLowerCase())
      );
      if (filter && filter.length > 10) {
        setFilteredQuery([
          {
            name: { common: "Too many matches, specify another filter" },
            cca3: "error",
          },
        ]);
      } else {
        setFilteredQuery(filter);
      }
    }
  }

  return (
    <>
      <div>
        find countries:{" "}
        <input type="text" onInput={handleUserInput} value={userInput} />
      </div>
      {filteredQuery && (
        <ul>
          {filteredQuery.map(
            ({ name, cca3, capital, area, languages, flags }) => (
              <li key={cca3}>
                {name.common}{" "}
                {capital && area && languages && flags ? (
                  <button
                    onClick={() =>
                      setDisplayInfo({
                        name,
                        cca3,
                        capital,
                        area,
                        languages,
                        flags,
                      })
                    }
                  >
                    show
                  </button>
                ) : null}
              </li>
            )
          )}
        </ul>
      )}
      {displayInfo && (
        <div key={displayInfo.cca3}>
          {displayInfo.name.common && (
            <>
              <h1>{displayInfo.name.common}</h1>
              <p>Capital: {displayInfo.capital}</p>
              <p>Area: {displayInfo.area}</p>
              <h3>Languages</h3>
              <ul>
                {Object.values(displayInfo.languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
              <img src={Object.values(displayInfo.flags)[0]} alt="flag" />
            </>
          )}
          {displayInfo.temp && (
            <>
              <h1>Weather in {displayInfo.name.common}</h1>
              <p>{(displayInfo.temp - 273.15).toFixed(1)} °C</p>
              <p>wind : {displayInfo.wind}</p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default App;
