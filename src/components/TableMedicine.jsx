import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "./Button";
import InputField from "./InputField";
import Modal from "./Modal";
import RowtableMedicine from "./RowTableMedicine";
import "../stylesheets/Medicines.css";
import { LocalStorage } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { MedicineApi } from "../api/medicine";
import { IllnessApi } from "../api/illness";

function TableMedicine() {
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState({
    id: null,
    name: "",
    illnesses: [],
  });
  const [medicamentos, setMedicamentos] = useState([]);
  const navigate = useNavigate();

  const openModal = (
    type,
    medicine = { id: null, name: "", illnesses: [] }
  ) => {
    setTypeModal(type === "add" ? "Insertar Medicina" : "Actualizar Medicina");
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const [enfermedades, setEnfermedades] = useState([]);

  const handleCheckboxChange = (illness) => {
    setSelectedMedicine((prev) => {
      const newIllness = prev.illnesses.includes(illness)
        ? prev.illnesses.filter((i) => i !== illness)
        : [...prev.illnesses, illness];
      return { ...prev, illnesses: newIllness };
    });
  };

  const handleSave = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas guardar esta medicina?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const jwt = LocalStorage.Get("token");
        if (typeModal === "Insertar Medicina") {
          //setMedicamentos((prev) => [...prev, selectedMedicine]); setmedicamentos otra vez
          //console.log("Medicina agregada:", selectedMedicine);

          await MedicineApi.createMedicine(
            jwt,
            selectedMedicine.name,
            selectedMedicine.illnesses
          );
          Swal.fire(
            "Guardado",
            "La medicina ha sido agregada exitosamente.",
            "success"
          );
        } else {
          setMedicamentos((prev) =>
            prev.map((med) =>
              med.id === selectedMedicine.id ? selectedMedicine : med
            )
          );
          //console.log("Medicina actualizada:", selectedMedicine);
          await MedicineApi.updateMedicine(
            jwt,
            selectedMedicine.id,
            selectedMedicine.name,
            selectedMedicine.illnesses
          );
          Swal.fire(
            "Actualizado",
            "La medicina ha sido actualizada exitosamente.",
            "success"
          );
        }

        const meds = await MedicineApi.getMedicines(jwt);
        setMedicamentos(meds);
        setShowModal(false);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const jwt = LocalStorage.Get("token");
      if (!jwt) {
        navigate("/");
        return;
      }
      try {
        const meds = await MedicineApi.getMedicines(jwt);
        const enfs = await IllnessApi.getIllness(jwt);

        setMedicamentos(meds);
        setEnfermedades(enfs);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar esta medicina?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const jwt = LocalStorage.Get("token");
        //console.log("Eliminando medicina con id:", id);
        await MedicineApi.deleteMedicine(jwt, id);
        //setMedicamentos((prev) => prev.filter((med) => med.id !== id));
        const meds = await MedicineApi.getMedicines(jwt);
        setMedicamentos(meds);
        Swal.fire(
          "Eliminado",
          "La medicina ha sido eliminada exitosamente.",
          "success"
        );
      }
    });
  };

  return (
    <div className="medicine-container-custom">
      <div className="header-custom">
        <Button
          variant={"primary"}
          children={"Insertar medicina"}
          onClick={() => openModal("add")}
        />
        <InputField type="text" className={"form"} label={"Buscar"} />
      </div>
      <br />
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <h2>{typeModal}</h2>
        <div className="modal-content-custom">
          <InputField
            type="text"
            label={"Medicina"}
            className="form"
            value={selectedMedicine.name}
            onChange={(e) =>
              setSelectedMedicine({
                ...selectedMedicine,
                name: e.target.value,
              })
            }
          />
          <label className="form-label-custom">Enfermedad asociada:</label>
        </div>
        <div className="radio-group-custom">
          {enfermedades.map((e, index) => (
            <label key={index} className="checkbox-label-custom">
              <input
                type="checkbox"
                value={e.id}
                checked={selectedMedicine.illnesses.includes(e.id)}
                onChange={() => handleCheckboxChange(e.id)}
              />
              <span className="checkbox-custom-custom"></span>
              {e.name}
            </label>
          ))}
        </div>
        <div className="center-custom">
          <Button
            variant={"primary"}
            children={"Guardar"}
            onClick={handleSave}
          />
        </div>
      </Modal>
      <div className="medicine-list-custom">
        {medicamentos.map((row) => (
          <RowtableMedicine
            key={row.id}
            name={row.name}
            illness={row.illnesses}
            updateClick={() => openModal("update", row)}
            deleteClick={() => handleDelete(row.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TableMedicine;
