import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  // Header component
  const Header = ({ courseName }) => {
    return <h1>{courseName}</h1>;
  };

  // Content component
  const Content = ({ content }) => {
    return (
      <div>
        {content.map((ite, index) => {
          return <p key={index}>{ite.name}</p>;
        })}
      </div>
    );
  };

  // Total component
  const Total = ({ parts }) => {
    return (
      <div>
        {parts.map((ite, index) => {
          return <p key={index}>{ite.exercises}</p>;
        })}
      </div>
    );
  };
  return (
    <>
      <Header courseName={course.name} />
      <Content content={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
