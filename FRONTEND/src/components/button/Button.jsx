import React from "react";
import "../button/button.css";

const Button = ({
  onClick,
  variant,
  text,
  isLoading = false,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`custom-btn ${variant}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Caricamento...
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
