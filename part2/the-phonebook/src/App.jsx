import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPerson, setFilterPerson] = useState("");
  const [notification, setNotification] = useState("");

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
        setNotification(`Error fetching data:${error}`);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filterPerson={filterPerson} setFilterPerson={setFilterPerson} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        addPerson={addPerson}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      {filteredPersons.length > 0 ? (
        <Persons
          personsToShow={filteredPersons}
          setPersons={setPersons}
          setNotification={setNotification}
        />
      ) : (
        <p>No persons found</p>
      )}
    </div>
  );
};

export default App;
