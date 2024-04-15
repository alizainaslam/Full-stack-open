import React, { useState } from "react";

const Button = ({ btnName, onClick }) => {
  return <button onClick={onClick}>{btnName}</button>;
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const positiveFeedback = () => {
    const total = good + bad + neutral;
    const positive = (good / total) * 100;
    return positive;
  };
  const averageFeedback = () => {
    const total = good + bad + neutral;
    const average = (bad / total) * 100;
    return average;
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button btnName={"good"} onClick={() => setGood(good + 1)} />
      <Button btnName={"neutral"} onClick={() => setNeutral(neutral + 1)} />
      <Button btnName={"bad"} onClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>natural {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {neutral === 0 ? 0 : `${averageFeedback()}%`} </p>
      <p>positive {good === 0 ? 0 : `${positiveFeedback()}%`}</p>
    </>
  );
};

export default App;
