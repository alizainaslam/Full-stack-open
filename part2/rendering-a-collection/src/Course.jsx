import React from "react";
import Header from "./components/Header";
import Part from "./components/Part";
import Content from "./components/Content";
import Calculate from "./components/Calculate";

const Course = ({ course }) => {
  return (
    <>
      <Header />
      <Part partHeading={course[0].name} />
      <Content content={course[0]} />
      <Calculate totalExercise={course[0]} />
      
      <Part partHeading={course[1].name} />
      <Content content={course[1]} />
      <Calculate totalExercise={course[1]} />
    </>
  );
};

export default Course;
