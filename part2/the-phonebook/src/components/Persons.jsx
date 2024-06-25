import React from "react";
import axios from "axios";

const Persons = ({ personsToShow, setPersons, setNotification }) => {
  const handleDeletePerson = (id, name) => {
    if (window.confirm("Do you really want to delete?")) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(personsToShow.filter((person) => person.id !== id));
          setNotification(`${name} deleted`);

          setTimeout(() => {
            setNotification(null);
          }, 3500);
        })
        .catch((error) => {
          setNotification(`${name} was already deleted from server`);
          setTimeout(() => {
            setNotification(null);
          }, 3500);
        });
    }
  };

  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDeletePerson(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
