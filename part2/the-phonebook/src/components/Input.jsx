import React from "react";

const Input = ({ type, onChange, value }) => {
  return (
    <div>
      <input type={type} onChange={onChange} value={value} />
    </div>
  );
};

export default Input;
