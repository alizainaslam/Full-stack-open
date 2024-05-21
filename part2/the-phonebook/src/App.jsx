import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPerson, setFilterPerson] = useState("");

  const addPerson = (newPerson) => {
    setPersons([...persons, newPerson]);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterPerson.toLowerCase())
  );
  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Something went wrong", error);
      });
    console.log("promise filled");
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPerson={filterPerson} setFilterPerson={setFilterPerson} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons personsToShow={filteredPersons} />
    </div>
  );
};

export default App;
