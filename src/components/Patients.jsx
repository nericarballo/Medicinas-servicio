import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import RowPatient from "./RowPatient.jsx";
import History from "./History.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../utils/LocalStorage.js";
import { IllnessApi } from "../api/illness.js";
import "../stylesheets/Patients.css";

function Patients() {
  const [page, setPage] = useState("patients");
  const [filter, setFilter] = useState([]);
  const [illnesses, setIllnesses] = useState([]);
  const [patients, setPatients] = useState([
    {
      id: "14234123",
      priority: 1,
      name: "José Luis Rodríguez López",
      illness: ["diabetes", "Hipertensión"],
    },
    { id: "14234124", priority: 2, name: "María García", illness: ["asma"] },
    {
      id: "14234125",
      priority: 3,
      name: "Carlos Pérez",
      illness: ["diabetes"],
    },
  ]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (page) => {
    setPage(page);
  };

  const handleClickHistory = (page, id) => {
    setPage(page);
    setSelectedPatientId(id);
    console.log(id);
    // TODO: Lógica para buscar la historia
  };

  const handleCheckboxChange = (condition) => {
    setFilter((prevFilter) =>
      prevFilter.includes(condition)
        ? prevFilter.filter((ill) => ill !== condition)
        : [...prevFilter, condition]
    );
  };

  const handleDeletePatient = (id) => {
    const patient = patients.find((p) => p.id === id);
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar a ${patient.name}?`,
      text: "No podrás revertir esto",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.id !== id)
        );
        console.log(`Paciente eliminado: ${patient.name}`);
        Swal.fire(
          "¡Eliminado!",
          `Paciente ${patient.name} eliminado con éxito.`,
          "success"
        );
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredPatients = patients.filter(
    (patient) =>
      (filter.length === 0 ||
        patient.illness.some((ill) => filter.includes(ill))) &&
      (searchTerm === "" ||
        removeAccents(patient.id).includes(removeAccents(searchTerm)) ||
        removeAccents(patient.name)
          .toLowerCase()
          .includes(removeAccents(searchTerm).toLowerCase()))
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const jwt = LocalStorage.Get("token");
      if (!jwt) {
        navigate("/");
        return;
      }
      try {
        const enfer = await IllnessApi.getIllness(jwt); //llamando a las enfermedades
        setIllnesses(enfer);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      {page === "patients" ? (
        <>
          <div className="patients-container">
            <h2>Pacientes</h2>
          </div>
          <br />
          <div className="patients-content">
            <div className="search-container">
              <InputField
                type="text"
                className={"form"}
                label={"Buscar"}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <br />
            <div className="flex-column">
              <div className="flex-wrap">
                {illnesses.map((i, index) => (
                  <label key={index} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={i.name}
                      checked={filter.includes(i.name)}
                      onChange={() => handleCheckboxChange(i.name)}
                    />
                    <span className="checkbox-custom"></span>
                    {i.name}
                  </label>
                ))}
              </div>
              {filteredPatients.map((patient) => (
                <RowPatient
                  key={patient.id}
                  id={patient.id}
                  name={patient.name}
                  priority={patient.priority}
                  illness={patient.illness}
                  handleClick={() => handleClickHistory("history", patient.id)}
                  onDelete={handleDeletePatient}
                />
              ))}
            </div>
          </div>
          <br />
        </>
      ) : null}
      {page === "history" && selectedPatientId ? (
        <History
          backClick={() => handleClick("patients")}
          patientId={selectedPatientId}
        />
      ) : null}
    </>
  );
}

export default Patients;
