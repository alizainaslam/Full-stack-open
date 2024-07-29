import React from "react";

const DetailRow = ({ label, value, children }) => {
  return (
    <p className="font-bold">
      {label}: <span className="text-md font-normal">{children || value}</span>
    </p>
  );
};

const LanguagesList = ({ languages }) => {
  return (
    <div className="flex">
      <h3 className="font-bold">Languages:&nbsp;</h3>
      <ul className="flex">
        {Object.values(languages).map((language, index) => (
          <li key={index}>• {language}.&nbsp;</li>
        ))}
      </ul>
    </div>
  );
};

const CountryDetail = ({ displayInfo }) => {
  return (
    <div key={displayInfo.cca3} className="flex flex-col p-5 pb-0">
      <div className="flex items-center gap-1 py-5">
        <img
          src={Object.values(displayInfo.flags)[0]}
          alt="flag"
          className="w-fit h-[30px] pb-0 rounded-full"
        />
        <h1 className="text-black font-bold text-3xl">
          {displayInfo.name.common}
        </h1>
      </div>
      <DetailRow label="Capital" value={displayInfo.capital} />
      <DetailRow label="Population" value={displayInfo.population} />
      <DetailRow label="Area" value={`${displayInfo.area}km²`} />
      <DetailRow label="Region" value={displayInfo.region} />
      <LanguagesList languages={displayInfo.languages} />
      <DetailRow label="Map">
        <a
          href={displayInfo.maps.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400"
        >
          Click
        </a>
      </DetailRow>
    </div>
  );
};

export default CountryDetail;
