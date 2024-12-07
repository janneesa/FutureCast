// Card.jsx
import React from "react";

function Card({ children }) {
  return (
    <div className="card">
      <div>{children}</div>
    </div>
  );
}

export default Card;
