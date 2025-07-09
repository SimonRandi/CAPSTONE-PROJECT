import React from "react";
import "../button/button.css";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`custom-btn ${props.variant}`}>
      {props.text}
    </button>
  );
};

export default Button;
