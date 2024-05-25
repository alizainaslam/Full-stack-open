import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPerson, setFilterPerson] = useState("");

  const addPerson = (newPersons) => {
    setPersons(newPersons);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterPerson.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPerson={filterPerson} setFilterPerson={setFilterPerson} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} addPerson={addPerson} />
      <h2>Numbers</h2>
      {filteredPersons.length > 0 ? (
        <Persons personsToShow={filteredPersons} setPersons={setPersons} />
      ) : (
        <p>No persons found</p>
      )}
    </div>
  );
};

export default App;
