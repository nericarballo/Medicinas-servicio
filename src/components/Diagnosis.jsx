import React, { useState } from "react";
import { FaAngleUp, FaAngleDown, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "../stylesheets/More.css";
import InputField from "./InputField.jsx";
import Button from "./Button.jsx";

function Diagnosis({
  id,
  illness,
  classification,
  notes,
  treatment,
  onIllnessChange,
  onClassificationChange,
  onNotesChange,
  onTreatmentChange,
  onUpdate,
  onDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
      <div className={`more-container ${isOpen ? "active" : ""}`} alt="Contenedor adicional con información expandible">
        <div className={`title ${isOpen ? "active" : ""}`} onClick={handleClick}
             alt="Título de la sección, clic para expandir o contraer">
          <h3 className={"title-text"}>{illness}</h3>
          <div className={"icons"} alt="Iconos de acciones">
            <FaTrashAlt className="arrow" onClick={() => onDelete(id)} alt="Icono de eliminar"/>
            {isOpen ? (
                <FaAngleUp className="arrow" alt="Icono de flecha hacia arriba para contraer"/>
            ) : (
                <FaAngleDown className="arrow" alt="Icono de flecha hacia abajo para expandir"/>
            )}
          </div>
        </div>
        {isOpen && (
            <div className={"section"} alt="Sección expandida con más información">
              <div className={"info"} alt="Información detallada">
                <div className="input-row" alt="Fila de entrada">
                  <select
                      name="classification"
                      className="select history"
                      defaultValue={classification}
                      onChange={onClassificationChange}
                      alt="Selector de clasificación de la enfermedad"
                  >
                    <option value="-">-</option>
                    <option value="Estadio I">Estadio I</option>
                    <option value="Estadio II">Estadio II</option>
                    <option value="Estadio III">Estadio III</option>
                  </select>
                  <InputField
                      label={"Observaciones"}
                      value={notes}
                      onChange={onNotesChange}
                      alt="Campo para ingresar observaciones"
                  />
                </div>
                <div className="input-full-width" alt="Campo de entrada de ancho completo">
                  <InputField
                      label={"Tratamiento"}
                      value={treatment}
                      onChange={onTreatmentChange}
                      alt="Campo para ingresar el tratamiento"
                  />
                </div>
                <div className={"center"} alt="Centro de acciones">
                  <Button
                      children={"Actualizar"}
                      variant={"primary"}
                      onClick={() => onUpdate(id)}
                      alt="Botón para actualizar la información"
                  />
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default Diagnosis;
