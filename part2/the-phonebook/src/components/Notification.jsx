import React from "react";

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  const className =
    message.includes("added") || message.includes("update") ? "added" : "minus";
  return (
    <>
      <div className={className}>{message}</div>
    </>
  );
};

export default Notification;
