import React, { useEffect, useState } from "react";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [filteredQuery, setFilteredQuery] = useState([]);

  // api call
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
            ({ cca3, name, capital, area, languages, flags }) => (
              <li key={cca3}>
                {filteredQuery.length === 1 ? (
                  <div>
                    <h1>{name.common}</h1>
                    {capital && area && languages && flags && (
                      <>
                        <p>capital {capital}</p>
                        <p>area {area}</p>
                        <h3>languages</h3>
                      </>
                    )}
                    {languages && (
                      <ul>
                        {Object.values(languages).map((language, index) => (
                          <li key={index}>{language}</li>
                        ))}
                      </ul>
                    )}
                    {flags && <img src={Object.values(flags)[0]} alt="" />}
                  </div>
                ) : (
                  <p>{name.common}</p>
                )}
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
};

export default App;
