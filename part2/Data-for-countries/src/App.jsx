import React, { useEffect, useState } from "react";
import "./App.css";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import Weather from "./components/Weather";
import Header from "./components/Header";
import countryMap from "../assets/country-map.png";

const App = () => {
  const someKey = import.meta.env.VITE_SOME_KEY;

  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [filteredQuery, setFilteredQuery] = useState([]);
  const [displayInfo, setDisplayInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isListVisible, setIsListVisible] = useState(true);

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
  const fetchWeather = async (countryName) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=${someKey}`
      );
      if (!weatherResponse.ok) {
        throw new Error(weatherResponse.status);
      } else {
        const jsonResponse = await weatherResponse.json();
        const finalTemp = jsonResponse.main.temp;
        const finalSpeed = jsonResponse.wind.speed;
        setWeatherInfo({
          temp: finalTemp,
          wind: finalSpeed,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      displayInfo &&
      displayInfo.name &&
      displayInfo.name.common !== "Too many matches, specify another filter"
    ) {
      fetchWeather(displayInfo.name.common);
    }
  }, [displayInfo]);

  const handleUserInput = (e) => {
    const userQuery = e.target.value;
    setUserInput(userQuery);
    handleFilterQuery(userQuery);
    setIsListVisible(true);
  };

  const handleFilterQuery = (userQuery) => {
    if (userQuery === "") {
      setFilteredQuery([]);
    } else {
      const filter = apiResponse.filter((filteredItem) =>
        filteredItem.name.common.toLowerCase().includes(userQuery.toLowerCase())
      );
      if (filter && filter.length > 5) {
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
  };

  return (
    <>
      <div className="max-w-[90%] m-auto text-gray-900 relative">
        <Header />
        <div className="flex flex-col m-auto md:max-w-[500px] gap-3">
          <img
            src={countryMap}
            alt=""
            className="w-32 md:w-48 m-auto opacity-70"
          />
          <h1 className="font-normal text-3xl text-center">
            Find country's detail
          </h1>
          <input
            type="text"
            onInput={handleUserInput}
            value={userInput}
            placeholder="Search"
            className=" p-2 px-4 rounded bg-gray-100 focus:outline-none"
          />
        </div>
        <div className="bg-white absolute left-0 right-0 max-w-[500px] m-auto rounded">
          <CountryList
            filteredQuery={filteredQuery}
            setDisplayInfo={setDisplayInfo}
            isListVisible={isListVisible}
            setIsListVisible={setIsListVisible}
          />
          {displayInfo && <CountryDetail displayInfo={displayInfo} />}
          {displayInfo && weatherInfo && (
            <Weather displayInfo={displayInfo} weatherInfo={weatherInfo} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
