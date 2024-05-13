import React from "react";

const Content = ({ content }) => {
  return (
    <div>
      {content.parts.map((getContent) => {
        return (
          <p key={getContent.id}>
            {getContent.name} {getContent.exercises}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
