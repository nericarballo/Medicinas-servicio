import React from "react";
import "../stylesheets/Button.css";

const Button = ({ variant, onClick, children, alt, disabled = false }) => {
  const getClassNames = () => {
    let classNames = "button";
    switch (variant) {
      case "primary":
        classNames += " button-primary";
        break;
      case "secondary":
        classNames += " button-secondary";
        break;
      case "outline":
        classNames += " button-outline";
        break;
      default:
        break;
    }
    if (disabled) {
      classNames += " button-disabled";
    }
    return classNames;
  };

  return (
    <button
      className={getClassNames()}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      alt={alt}
    >
      {children}
    </button>
  );
};

export default Button;
