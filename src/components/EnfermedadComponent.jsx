import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { FaTrash } from "react-icons/fa6";
import "../stylesheets/Items.css";

const EnfermedadComponent = ({
  enfermedadesExistentes,
  agregarEnfermedad,
  eliminarEnfermedad,
}) => {
  const [nuevaEnfermedad, setNuevaEnfermedad] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaEnfermedad.trim().length < 3) {
      setError("La enfermedad debe tener al menos 3 caracteres.");
      return;
    }
    agregarEnfermedad(nuevaEnfermedad);
    setNuevaEnfermedad(""); // Limpiar el input después de agregar
    setError(""); // Limpiar el mensaje de error
  };

  return (
    <div className="create-disease-container">
      <h2 className="title-item">Crear enfermedad</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <InputField
          label={"Ingresar enfermedad"}
          className="form"
          value={nuevaEnfermedad}
          onChange={(e) => setNuevaEnfermedad(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <Button children={"Agregar"} variant={"primary"} />
      </form>

      <div className="existing-diseases">
        <h3 className="subtitle">Enfermedades en sistema:</h3>
        <ul className="disease-list">
          {enfermedadesExistentes.map((enfermedad) => (
            <div key={enfermedad.id} className="disease-item">
              <li className="disease-name">{enfermedad.name}</li>
              <button
                className="action-btn delete-btn"
                aria-label="Delete"
                onClick={() => eliminarEnfermedad(enfermedad.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EnfermedadComponent;
