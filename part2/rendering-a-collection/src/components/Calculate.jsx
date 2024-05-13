import React from "react";

const Calculate = ({ totalExercise }) => {
  const total = totalExercise.parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);
  return (
    <>
      <h2>total of {total} exercises</h2>
    </>
  );
};

export default Calculate;
