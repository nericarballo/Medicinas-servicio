import React from "react";
import { FaTrash } from "react-icons/fa6";
import Button from "./Button.jsx";
import "../stylesheets/Patients.css";

function RowPatient({ priority, id, name, illness, handleClick, onDelete }) {
  const getPriority = (priority) => {
    if (priority === 1) {
      return "red";
    } else if (priority === 2) {
      return "yellow";
    } else if (priority === 3) {
      return "green";
    } else return "";
  };

  const getTagColor = (illness) => {
    switch (illness.toLowerCase()) {
      case "diabetes":
        return "#ff7777"; // Color para diabetes
      case "hipertension":
        return "#9933ff"; // Color para hipertensión
      default:
        return "#00e6e0"; // Color por defecto
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="row-patient shadow">
      <div
        className="priority-indicator"
        style={{ backgroundColor: getPriority(priority) }}
      ></div>
      <span className="patient-id">{id}</span>
      <span className="patient-name">{name}</span>
      <div className="patient-illness">
        {illness.map((ill, index) => (
          <div
            key={index}
            className="tag"
            style={{ backgroundColor: getTagColor(ill) }}
          >
            {capitalizeFirstLetter(ill)}
          </div>
        ))}
      </div>
      <Button
        variant={"outline"}
        children={"Ver historia"}
        onClick={handleClick}
      />
      <div className="actions-column">
        <button
          className="action-btn delete-btn"
          aria-label="Delete"
          onClick={() => onDelete(id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default RowPatient;
