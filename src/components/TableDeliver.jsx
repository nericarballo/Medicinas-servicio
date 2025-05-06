import React, { useState } from "react";
import Swal from "sweetalert2";
import Button from "./Button";
import InputField from "./InputField";
import Rowtable from "./RowTable";

function TableDeliver({ onClick }) {
  const [treatments, setTreatments] = useState([
    {
      treatmentId: "1",
      priority: 1,
      id: "1234567",
      name: "Marcos Perez Gimenedz",
      med: "Medicamentoddddd 2",
      quantity: "20",
      lote: 222,
      date: "27/09/24",
    },
    {
      treatmentId: "2",
      priority: 2,
      id: "1234567",
      name: "Marcos Perez Gimenez",
      med: "Medicamento 2",
      quantity: "60",
      lote: 22332,
      date: "27/09/24",
    },
    {
      treatmentId: "3",
      priority: 3,
      id: "1234567",
      name: "Maria Jose Rodriguez",
      med: "Medicamento 55",
      quantity: "30",
      lote: 272,
      date: "27/09/24",
    },
    {
      treatmentId: "4",
      priority: 2,
      id: "1234567",
      name: "Marcos Perez Gimenez",
      med: "Medicamento 2",
      quantity: "60",
      lote: 222,
      date: "27/09/24",
    },
  ]);

  const handleDelete = (treatmentId) => {
    const treatment = treatments.find((t) => t.treatmentId === treatmentId);
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar el tratamiento de ${treatment.name}?`,
      text: "No podrás revertir esto",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setTreatments((prevTreatments) =>
          prevTreatments.filter((t) => t.treatmentId !== treatmentId)
        );
        console.log(`Eliminar tratamiento con id: ${treatmentId}`);
        // TODO Lógica para eliminar en el backend
        Swal.fire(
          "¡Eliminado!",
          `Tratamiento de ${treatment.name} eliminado con éxito.`,
          "success"
        );
      }
    });
  };

  const handleCheck = (treatmentId) => {
    const treatment = treatments.find((t) => t.treatmentId === treatmentId);
    Swal.fire({
      title: `¿Estás seguro de que deseas marcar como entregado el tratamiento de ${treatment.name}?`,
      text: "Esta acción no se puede deshacer",
      icon: "question",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Sí, marcar como entregado",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setTreatments((prevTreatments) =>
          prevTreatments.filter((t) => t.treatmentId !== treatmentId)
        );
        console.log(`Entregar tratamiento con id: ${treatmentId}`);
        // TODO Lógica para marcar como entregado en el backend
        Swal.fire(
          "¡Entregado!",
          `Tratamiento de ${treatment.name} marcado como entregado.`,
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
          children={"Asignar medicamentos"}
          onClick={() => onClick("assign")}
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
        {treatments.map((treatment, index) => (
          <Rowtable
            key={index}
            treatmentId={treatment.treatmentId}
            priority={treatment.priority}
            id={treatment.id}
            name={treatment.name}
            med={treatment.med}
            quantity={treatment.quantity}
            lote={treatment.lote}
            date={treatment.date}
            onDelete={handleDelete}
            onCheck={handleCheck}
          />
        ))}
      </div>
    </div>
  );
}

export default TableDeliver;
