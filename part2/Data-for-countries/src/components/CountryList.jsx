import React from "react";

const CountryList = ({
  filteredQuery,
  setDisplayInfo,
  isListVisible,
  setIsListVisible,
}) => {
  const handleItemClick = (country) => {
    setDisplayInfo(country);
    setIsListVisible(false);
  };

  return (
    isListVisible && (
      <ul
        className="bg-white z-10 absolute left-0 right-0 max-w-[500px] m-auto rounded"
        onClick={() => setIsListVisible(false)}
      >
        {filteredQuery.map(
          ({
            name,
            cca3,
            capital,
            area,
            languages,
            flags,
            region,
            population,
            maps,
          }) => (
            <li
              key={cca3}
              className="border-b p-2 flex justify-between items-center px-3"
              onClick={(e) => {
                e.stopPropagation();
                handleItemClick({
                  name,
                  cca3,
                  capital,
                  area,
                  languages,
                  flags,
                  region,
                  population,
                  maps,
                });
              }}
            >
              <div className="flex gap-3">{name.common}</div>
              {capital &&
              area &&
              languages &&
              flags &&
              region &&
              population &&
              maps ? (
                <button
                  className="bg-blue-400 text-white px-4 pt-1 pb-[5px] rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick({
                      name,
                      cca3,
                      capital,
                      area,
                      languages,
                      flags,
                      region,
                      population,
                      maps,
                    });
                  }}
                >
                  +
                </button>
              ) : null}
            </li>
          )
        )}
      </ul>
    )
  );
};

export default CountryList;
