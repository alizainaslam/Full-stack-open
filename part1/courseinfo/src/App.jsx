import React from "react";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };

  const Part = (props) => {
    return (
      <p>
        {props.content} {props.exercise}
      </p>
    );
  };

  const Content = () => {
    return (
      <>
        <Part content={part1} exercise={exercises1} />
        <Part content={part2} exercise={exercises2} />
        <Part content={part3} exercise={exercises3} />
      </>
    );
  };

  const Total = ({ content, total }) => {
    return (
      <>
        <p>
          {content}
          {total}
        </p>
      </>
    );
  };

  return (
    <>
      <Header course={course} />
      <Content />
      <Total
        content="Number of exercises "
        total={exercises1 + exercises2 + exercises3}
      />
    </>
  );
};

export default App;
