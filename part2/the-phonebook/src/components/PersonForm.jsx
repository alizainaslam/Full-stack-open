import React, { useState } from "react";
import Input from "./Input";

const PersonForm = ({ persons, addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const existPerson = persons.some((person) => person.name === newName);

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (existPerson) {
      alert(`${newName} is already added to phonebook`);
    } else {
      addPerson(newPerson);
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        name:
        <Input type="text" onChange={(e) => setNewName(e.target.value)} value={newName} />
        <div>
          number: <Input type="tel" onChange={(e) => setNewNumber(e.target.value)} value={newNumber} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default PersonForm;
