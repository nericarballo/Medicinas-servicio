import React, { useState, useEffect } from "react";
import "../stylesheets/InputField.css";

const InputField = ({
  id,
  label,
  value,
  type = "text",
  className = "",
  onChange,
  suggestions = [],
  onlyNumbers = false,
  onlyAlphanumeric = false,
  onlyLetters = false,
  validateEmail = false,
  maxLength,
  helperText,
  disabled = false,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState(value);
  const [error, setError] = useState("");

  useEffect(() => {
    setUserInput(value);
  }, [value]);

  const handleChange = (e) => {
    let userInput = e.currentTarget.value;

    // Validación para solo aceptar números
    if (onlyNumbers) {
      userInput = userInput.replace(/\D/g, "");
    }

    // Validación para solo aceptar letras y números
    if (onlyAlphanumeric) {
      userInput = userInput.replace(/[^a-zA-Z0-9]/g, "");
    }

    // Validación para solo aceptar letras y espacios, sin permitir dos espacios seguidos
    if (onlyLetters) {
      userInput = userInput.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""); // Elimina cualquier carácter que no sea una letra, letra con acento o un espacio
      userInput = userInput.replace(/\s{2,}/g, " "); // Reemplaza dos o más espacios seguidos con un solo espacio
    }

    // Validación de correo electrónico
    if (validateEmail) {
      userInput = userInput.replace(/[^a-zA-Z0-9@._-]/g, "");
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(userInput)) {
        setError("Correo electrónico inválido");
      } else {
        setError("");
      }
    }

    // Validación de longitud máxima
    if (maxLength !== undefined && userInput.length > maxLength) {
      userInput = userInput.slice(0, maxLength);
    }

    setUserInput(userInput);
    onChange({ target: { value: userInput } });

    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleClick = (e) => {
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
    onChange({ target: { value: e.currentTarget.innerText } });
  };

  return (
    <div className={`input-container ${className}`}>
      <input
        type={type}
        id={id}
        placeholder=" "
        value={userInput}
        onChange={handleChange}
        maxLength={maxLength} // Esto también limita el largo del input en el DOM
        disabled={disabled} // Añadido para manejar inputs deshabilitados
      />
      <label htmlFor={id}>{label}</label>
      {helperText && <small className="helper-text">{helperText}</small>}
      {error && <small className="error-message">{error}</small>}
      {showSuggestions && userInput && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={handleClick}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputField;
