import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";

const PersonForm = ({ persons, addPerson, setNotification }) => {
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
            setNotification(`${updatedPerson.name}'s number update`);
            setTimeout(() => {
              setNotification(null);
            }, 3500);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            setNotification(`Error updating person:", ${error}`);
            setTimeout(() => {
              setNotification(null);
            }, 3500);
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
          setNotification(`${newPerson.name} added`);
          setTimeout(() => {
            setNotification(null);
          }, 3500);
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          setNotification(`Error adding person:", ${error}`);
          setTimeout(() => {
            setNotification(null);
          }, 3500);
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
