import React from "react";
import countryMap from "../../assets/country-map.png";

const CountryList = ({ filteredQuery, setDisplayInfo }) => {
  return (
    <ul className="bg-gray-50 z-10 absolute left-0 right-0 max-w-[500px] m-auto rounded-2xl">
      {filteredQuery.map(({ name, cca3, capital, area, languages, flags }) => (
        <li key={cca3} className="border-b p-2 flex justify-between px-3">
          <div className="flex gap-3">
            {/* <img src={countryMap} alt="" className="w-10" /> */}
            {name.common}{" "}
          </div>
          {capital && area && languages && flags ? (
            <button
              className="bg-gray-800 text-white px-4 pt-1 pb-[5px] rounded"
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
              Show
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
