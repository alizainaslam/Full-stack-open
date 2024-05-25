import React from "react";
import axios from "axios";

const Persons = ({ personsToShow, setPersons }) => {
  const handleDeletePerson = (id) => {
    if (window.confirm("Do you really want to delete?")) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(personsToShow.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting:", error);
        });
    }
  };

  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDeletePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
