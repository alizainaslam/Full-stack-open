import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Button = ({ btnName, onClick }) => {
    return <button onClick={onClick}>{btnName}</button>;
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
    </>
  );
};

export default App;
