import { GiMedicines } from "react-icons/gi";
import CardNumber from "./CardNumber";
import Button from "./Button";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaCircleRadiation, FaPlus, FaTrash } from "react-icons/fa6";
import { useState } from "react";
import MoreInventory from "./MoreInventory";
import InputField from "./InputField";
import { calculatePriority } from "../utils/utils.jsx";
import Swal from "sweetalert2";
import "../stylesheets/Inventory.css";

function Inventory() {
  const donors = [
    { value: "D1", label: "Donor 1" },
    { value: "D2", label: "Donor 2" },
  ];

  const medicines = [
    { value: "M1", label: "Medicina 1" },
    { value: "M2", label: "Medicina 2" },
  ];

  const diseases = [
    { value: "all", label: "Todas" },
    { value: "D1", label: "Enfermedad 1" },
    { value: "D2", label: "Enfermedad 2" },
  ];

  const initialInventory = [
    {
      title: "medicina 1",
      diseases: ["D1", "D2"],
      rows: [
        {
          id: 6,
          name: "medicina 1",
          gm: "300g",
          med: "123",
          date: "2024/08/15",
          quantity: 77,
        },
        {
          id: 5,
          name: "medicina 1",
          gm: "300g",
          med: "123",
          date: "2024/09/15",
          quantity: 77,
        },
      ],
    },
    {
      title: "medicina 2",
      diseases: ["D2"],
      rows: [
        {
          id: 1,
          name: "medicina 2",
          gm: "200g",
          med: "456",
          date: "2025/08/15",
          quantity: 50,
        },
        {
          id: 2,
          name: "medicina 2",
          gm: "200g",
          med: "456",
          date: "2024/12/15",
          quantity: 50,
        },
      ],
    },
    {
      title: "medicina 3",
      diseases: ["D1"],
      rows: [
        {
          id: 4,
          name: "medicina 3",
          gm: "150g",
          med: "789",
          date: "2025/08/15",
          quantity: 30,
        },
        {
          id: 3,
          name: "medicina 3",
          gm: "150g",
          med: "789",
          date: "2025/08/15",
          quantity: 30,
        },
      ],
    },
  ];

  const [donor, setDonor] = useState(donors[0].value);
  const [med, setMed] = useState(medicines[0].value);
  const [disease, setDisease] = useState(diseases[0].value);
  const [medicinesList, setMedicinesList] = useState([
    {
      id: 0,
      med: medicines[0].value,
      presentation: "",
      lote: "",
      expirationDate: "",
      quantity: "",
    },
  ]);
  const [inventory, setInventory] = useState(initialInventory);
  const [errors, setErrors] = useState({});
  const [agg, setAgg] = useState(false);

  const addMedicine = () => {
    setMedicinesList([
      ...medicinesList,
      {
        id: medicinesList.length,
        med: "",
        presentation: "",
        lote: "",
        expirationDate: "",
        quantity: "",
      },
    ]);
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicinesList = [...medicinesList];
    newMedicinesList[index][field] = value;
    setMedicinesList(newMedicinesList);
  };

  const removeMedicine = (index) => {
    if (medicinesList.length > 1) {
      const newMedicinesList = medicinesList.filter((_, i) => i !== index);
      setMedicinesList(newMedicinesList);
    }
  };

  const filteredInventory =
    disease === "all"
      ? inventory
      : inventory.filter((inv) => inv.diseases.includes(disease));

  const handleDeleteMore = (title) => {
    setInventory((prevInventory) =>
      prevInventory.filter((more) => more.title !== title)
    );
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = "Este campo es obligatorio";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSave = () => {
    // Validar todos los campos antes de guardar
    let valid = true;
    medicinesList.forEach((medicine, index) => {
      if (
        !medicine.med ||
        !medicine.presentation ||
        !medicine.lote ||
        !medicine.expirationDate ||
        !medicine.quantity
      ) {
        valid = false;
        validateField(`medicine-${index}-med`, medicine.med);
        validateField(`medicine-${index}-presentation`, medicine.presentation);
        validateField(`medicine-${index}-lote`, medicine.lote);
        validateField(
          `medicine-${index}-expirationDate`,
          medicine.expirationDate
        );
        validateField(`medicine-${index}-quantity`, medicine.quantity);
      }
    });

    if (valid) {
      // Mostrar datos ingresados por el usuario
      const medicineDetails = medicinesList
        .map(
          (medicine, index) => `
      <strong>Medicina ${index + 1}:</strong><br>
      Medicamento: ${medicine.med}<br>
      Presentación: ${medicine.presentation}<br>
      Lote: ${medicine.lote}<br>
      Fecha de Expiración: ${medicine.expirationDate}<br>
      Cantidad: ${medicine.quantity}<br>
    `
        )
        .join("<br>");

      Swal.fire({
        title: "Confirmar Guardado",
        html: `
        <p>¿Estás seguro de que deseas guardar los siguientes datos?</p>
        ${medicineDetails}
      `,
        icon: "question",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Lógica para guardar los datos
          Swal.fire(
            "Guardado!",
            "Los datos han sido guardados exitosamente.",
            "success"
          );
        }
      });
    } else {
      Swal.fire(
        "Error",
        "Por favor, completa todos los campos requeridos.",
        "error"
      );
    }
  };

  const getTotalMedicines = (inventory) =>
    inventory.reduce(
      (sum, inv) =>
        sum + inv.rows.reduce((rowSum, row) => rowSum + row.quantity, 0),
      0
    );
  const getExpiringMedicines = (inventory) =>
    inventory.reduce(
      (sum, inv) =>
        sum +
        inv.rows
          .filter((row) => calculatePriority(row.date) === 2)
          .reduce((rowSum, row) => rowSum + row.quantity, 0),
      0
    );
  const getExpiredMedicines = (inventory) =>
    inventory.reduce(
      (sum, inv) =>
        sum +
        inv.rows
          .filter((row) => calculatePriority(row.date) === 1)
          .reduce((rowSum, row) => rowSum + row.quantity, 0),
      0
    );

  const totalMedicines = getTotalMedicines(filteredInventory);
  const expiringMedicines = getExpiringMedicines(filteredInventory);
  const expiredMedicines = getExpiredMedicines(filteredInventory);

  return (
    <>
      <div className="header-container">
        <h2>Inventario</h2>
        <Button
          children={agg ? "Volver" : "Agregar donativo"}
          variant="primary"
          onClick={() => setAgg(!agg)}
        />
      </div>
      <br />
      {agg ? (
        <div className="agg-container">
          <div className="relative-container">
            <select
              name="donor"
              className="select history"
              value={donor}
              onChange={(e) => {
                setDonor(e.target.value);
                validateField("donor", e.target.value);
              }}
            >
              {donors.map((donor) => (
                <option key={donor.value} value={donor.value}>
                  {donor.label}
                </option>
              ))}
            </select>
            {errors.donor && <span className="error">{errors.donor}</span>}
          </div>
          <br />
          <br />
          {medicinesList.map((medicine, index) => (
            <div key={index} className="medicine-container">
              <div className="relative-container flex-1">
                <select
                  name="Med"
                  className="select history"
                  value={medicine.med}
                  onChange={(e) => {
                    handleMedicineChange(index, "med", e.target.value);
                    validateField(`medicine-${index}-med`, e.target.value);
                  }}
                >
                  {medicines.map((med) => (
                    <option key={med.value} value={med.value}>
                      {med.label}
                    </option>
                  ))}
                </select>
                {errors[`medicine-${index}-med`] && (
                  <span className="error">
                    {errors[`medicine-${index}-med`]}
                  </span>
                )}
              </div>

              <div className="relative-container flex-1">
                <InputField
                  className="form"
                  label={"Presentación (gr)"}
                  onlyNumbers={true}
                  maxLength={5}
                  value={medicine.presentation}
                  onChange={(e) => {
                    handleMedicineChange(index, "presentation", e.target.value);
                    validateField(
                      `medicine-${index}-presentation`,
                      e.target.value
                    );
                  }}
                />
                {errors[`medicine-${index}-presentation`] && (
                  <span className="error">
                    {errors[`medicine-${index}-presentation`]}
                  </span>
                )}
              </div>
              <div className="relative-container flex-1">
                <InputField
                  className="form"
                  label={"Lote"}
                  maxLength={10}
                  value={medicine.lote}
                  onChange={(e) => {
                    handleMedicineChange(index, "lote", e.target.value);
                    validateField(`medicine-${index}-lote`, e.target.value);
                  }}
                />
                {errors[`medicine-${index}-lote`] && (
                  <span className="error">
                    {errors[`medicine-${index}-lote`]}
                  </span>
                )}
              </div>
              <div className="relative-container flex-1">
                <InputField
                  className="form"
                  type="date"
                  label={"Fecha Vencimiento"}
                  value={medicine.expirationDate}
                  onChange={(e) => {
                    handleMedicineChange(
                      index,
                      "expirationDate",
                      e.target.value
                    );
                    validateField(
                      `medicine-${index}-expirationDate`,
                      e.target.value
                    );
                  }}
                />
                {errors[`medicine-${index}-expirationDate`] && (
                  <span className="error">
                    {errors[`medicine-${index}-expirationDate`]}
                  </span>
                )}
              </div>
              <div className="relative-container flex-1">
                <InputField
                  className="form"
                  label={"Cantidad"}
                  onlyNumbers={true}
                  maxLength={5}
                  value={medicine.quantity}
                  onChange={(e) => {
                    handleMedicineChange(index, "quantity", e.target.value);
                    validateField(`medicine-${index}-quantity`, e.target.value);
                  }}
                />
                {errors[`medicine-${index}-quantity`] && (
                  <span className="error">
                    {errors[`medicine-${index}-quantity`]}
                  </span>
                )}
              </div>
              <button
                className="action-btn delete-btn"
                aria-label="Delete"
                onClick={() => removeMedicine(index)}
                disabled={medicinesList.length === 1}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button className="add-medicine-btn" onClick={addMedicine}>
            <FaPlus />
            Agregar
          </button>

          <div className="save-btn-container">
            <Button
              children={"Guardar donativo"}
              variant={"primary"}
              onClick={handleSave}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="inventory-summary">
            <CardNumber
              number={totalMedicines}
              descriptor={"Medicamentos en inventario"}
              Icon={GiMedicines}
            />
            <CardNumber
              number={expiringMedicines}
              descriptor={"Medicamentos por caducar"}
              Icon={BsFillCalendarDateFill}
            />
            <CardNumber
              number={expiredMedicines}
              descriptor={"Medicamentos caducados"}
              Icon={FaCircleRadiation}
            />
          </div>
          <br />
          <div className="filter-container">
            <div className="input" style={{ justifyContent: "end", gap: 10 }}>
              <select
                name="disease"
                className="select history"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
              >
                {diseases.map((dis) => (
                  <option key={dis.value} value={dis.value}>
                    {dis.label}
                  </option>
                ))}
              </select>
            </div>
            {filteredInventory.map((inv, index) => (
              <MoreInventory
                key={index}
                title={inv.title}
                quantity={inv.rows.reduce((sum, row) => sum + row.quantity, 0)}
                rows={inv.rows}
                onDeleteMore={() => handleDeleteMore(inv.title)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Inventory;
