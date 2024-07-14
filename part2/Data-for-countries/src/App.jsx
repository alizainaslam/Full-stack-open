import React, { useEffect, useState } from "react";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [filteredQuery, setFilteredQuery] = useState([]);
  const [displayInfo, setDisplayInfo] = useState(null);

  // API call
  useEffect(() => {
    const apiCall = async () => {
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
    apiCall();
  }, []);

  function handleUserInput(e) {
    const userQuery = e.target.value;
    setUserInput(userQuery);
    handleFilterQuery(userQuery);
    if (userQuery === "") {
      setDisplayInfo(null);
    }
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
                      setDisplayInfo({ name, capital, area, languages, flags })
                    }
                  >
                    show
                  </button>
                ) : (
                  <p></p>
                )}
              </li>
            )
          )}
        </ul>
      )}
      {displayInfo && (
        <div key={displayInfo.name.common}>
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
        </div>
      )}
    </>
  );
};

export default App;
