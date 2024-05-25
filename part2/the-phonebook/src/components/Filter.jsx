import React from "react";

const Filter = ({ filterPerson, setFilterPerson }) => {
  return (
    <div>
      filter shown with:
      <input
        type="text"
        onChange={(e) => setFilterPerson(e.target.value)}
        value={filterPerson}
      />
    </div>
  );
};

export default Filter;
