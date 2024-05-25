import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";

const PersonForm = ({ persons, addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        axios
          .put(
            `http://localhost:3001/persons/${existingPerson.id}`,
            updatedPerson
          )
          .then((response) => {
            addPerson(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response.data
              )
            );
          })
          .catch((error) => {
            console.error("Error updating person:", error);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      };

      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          addPerson(persons.concat(response.data));
        })
        .catch((error) => {
          console.error("Error adding person:", error);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <Input
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
        </div>
        <div>
          number:
          <Input
            type="tel"
            onChange={(e) => setNewNumber(e.target.value)}
            value={newNumber}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default PersonForm;
