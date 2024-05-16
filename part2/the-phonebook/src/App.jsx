import React, { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);
  const [filterPerson, setFilterPerson] = useState("");

  const addPerson = (newPerson) => {
    setPersons([...persons, newPerson]);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterPerson.toLowerCase())
  );

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
