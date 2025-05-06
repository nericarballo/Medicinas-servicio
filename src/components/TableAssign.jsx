import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "./Button";
import InputField from "./InputField";
import RowtableAssign from "./RowtableAssign";
import Modal from "./Modal";

function TableAssign({ onClick }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rows, setRows] = useState([
    {
      treatmentId: "1",
      priority: 1,
      id: "1234567",
      name: "Marcos Perez Gimenez",
      med: "Medicamento 2",
      quantity: 699,
      lote: 222,
      date1: "27/09/24",
      date2: "27/09/24",
      available: true,
    },
    {
      treatmentId: "2",
      priority: 2,
      id: "7654321",
      name: "Lucia Fernandez Lopez",
      med: "Medicamento 5",
      quantity: 150,
      lote: 987,
      date1: "28/09/24",
      date2: "28/09/24",
      available: true,
    },
    {
      treatmentId: "3",
      priority: 3,
      id: "4567890",
      name: "Carlos Garcia Moreno",
      med: "Medicamento 3",
      quantity: 300,
      lote: 654,
      date1: "29/09/24",
      date2: "29/09/24",
      available: false,
    },
    {
      treatmentId: "4",
      priority: 1,
      id: "7890123",
      name: "Ana Sanchez Diaz",
      med: "Medicamento 1",
      quantity: 500,
      lote: 321,
      date1: "30/09/24",
      date2: "30/09/24",
      available: true,
    },
    {
      treatmentId: "5",
      priority: 2,
      id: "2345678",
      name: "Javier Martinez Perez",
      med: "Medicamento 4",
      quantity: 250,
      lote: 111,
      date1: "01/10/24",
      date2: "01/10/24",
      available: false,
    },
    {
      treatmentId: "6",
      priority: 3,
      id: "3456789",
      name: "Isabel Rodriguez Torres",
      med: "Medicamento 6",
      quantity: 750,
      lote: 333,
      date1: "02/10/24",
      date2: "02/10/24",
      available: true,
    },
  ]);

  useEffect(() => {
    if (!showModal) {
      setSelectedTreatment(null);
      setSelectedDate(null);
    }
  }, [showModal]);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `20${year}-${month}-${day}`;
  };

  const handleAssign = (treatmentId) => {
    const treatment = rows.find((row) => row.treatmentId === treatmentId);
    setSelectedTreatment(treatment);
    setSelectedDate(formatDate(treatment.date2));
    setShowModal(true);
  };

  const handleSave = () => {
    Swal.fire({
      title: "Confirmar Asignación",
      text: `¿Estás seguro de que deseas asignar el tratamiento a ${selectedTreatment.name}?`,
      icon: "question",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Sí, asignar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTreatment = {
          ...selectedTreatment,
          date2: selectedDate,
        };
        console.log("Guardar tratamiento:", updatedTreatment);
        // TODO Agregar lógica para guardar asignación en el backend
        setRows((prevRows) =>
          prevRows.filter(
            (row) => row.treatmentId !== selectedTreatment.treatmentId
          )
        );
        setShowModal(false);
        Swal.fire(
          "¡Asignado!",
          `Tratamiento asignado a ${selectedTreatment.name} con éxito.`,
          "success"
        );
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        justifyContent: "center",
        gap: 20,
        height: "100%",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant={"primary"}
          children={"Entregas Pendientes"}
          onClick={() => onClick("deliver")}
        />
        <InputField
          type="text"
          className={"form"}
          label={"Buscar"}
          onlyNumbers={true}
          maxLength={8}
        />
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <Modal show={showModal} handleClose={() => setShowModal(false)}>
          <h2>Asignar Medicamento</h2>
          {selectedTreatment && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label>Cedula: {selectedTreatment.id}</label>
              <label>Nombre: {selectedTreatment.name}</label>
              <label>Medicamento: {selectedTreatment.med}</label>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <label>Fecha de retiro: </label>
                <InputField
                  type="date"
                  className="form"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className={"center"}>
            <Button
              variant={"primary"}
              children={"Guardar"}
              onClick={handleSave}
            />
          </div>
        </Modal>

        <div className="row-table" style={{ fontSize: 12, marginBottom: -25 }}>
          <div className={`priority-indicator`} style={{ width: "64%" }}></div>
          <span className="column date-column-assign">Última Entrega</span>
          <span className="column date-column-assign">Renovación</span>
        </div>
        {rows.map((row) => (
          <RowtableAssign
            key={row.treatmentId}
            treatmentId={row.treatmentId}
            priority={row.priority}
            id={row.id}
            name={row.name}
            med={row.med}
            quantity={row.quantity}
            date1={row.date1}
            date2={row.date2}
            available={row.available}
            setModal={handleAssign}
          />
        ))}
      </div>
    </div>
  );
}

export default TableAssign;
