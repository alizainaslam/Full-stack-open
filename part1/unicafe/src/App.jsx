import React, { useState } from "react";

const Button = ({ btnName, onClick }) => {
  return <button onClick={onClick}>{btnName}</button>;
};

const Statistics = ({ label, value }) => {
  return (
    <tr>
      <td>{value === 0 ? null : label}</td>
      <td>{value === 0 ? null : value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const positive = total === 0 ? 0 : (good / total) * 100;
  const average = total === 0 ? 0 : (bad / total) * 100;

  return (
    <>
      <h1>give feedback</h1>
      <Button btnName={"good"} onClick={() => setGood(good + 1)} />
      <Button btnName={"neutral"} onClick={() => setNeutral(neutral + 1)} />
      <Button btnName={"bad"} onClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistics label="good" value={good} />
          <Statistics label="neutral" value={neutral} />
          <Statistics label="bad" value={bad} />
          {total === 0 ? (
            <Statistics label="" value="no feedback given" />
          ) : (
            <Statistics label="all" value={total} />
          )}

          <Statistics label="average" value={average} />
          <Statistics label="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

export default App;
