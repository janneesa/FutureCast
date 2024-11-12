// Card.jsx
import React from "react";

function Card({ title, description, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
}

export default Card;
