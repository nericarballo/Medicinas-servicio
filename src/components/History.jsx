import {
  FaAddressCard,
  FaHouse,
  FaLocationDot,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import InputField from "./InputField";
import Button from "./Button";
import { BsFillCalendarDateFill, BsGenderAmbiguous } from "react-icons/bs";
import "../stylesheets/Dashboard.css";
import "../stylesheets/Form.css";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { useEffect, useState } from "react";
import More from "./More.jsx";
import Table from "./Table.jsx";
import Diagnosis from "./Diagnosis.jsx";
import RowTreatment from "./RowTreatment.jsx";
import Modal from "./Modal.jsx";
import Swal from "sweetalert2";
//TODO Reiniciar los modales

function History({ backClick, patientId }) {
  const [inputValue, setInputValue] = useState("");
  const meds = ["Prednisona", "Losartan", "Insulina"];
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sectores = [
    "Barrio Lindo",
    "Alambique",
    "Santos Luzardo",
    "Cardenales",
    "Los Luises",
  ];
  //TODO Obtener datos con patientId
  const pacienteDatos = {
    id: "12352242",
    nombres: "Jose María",
    apellidos: "Pérez Ortega",
    sexo: "Masculino",
    fnacimiento: "1973-04-03",
    sector: "Los Luises",
    direccion: "Casa imaginaria",
    telefono: "02567654567",
    celular: "04162425353",
  };

  const [id, setId] = useState(pacienteDatos.id);
  const [nombres, setNombres] = useState(pacienteDatos.nombres);
  const [apellidos, setApellidos] = useState(pacienteDatos.apellidos);
  const [sexo, setSexo] = useState(pacienteDatos.sexo);
  const [fnacimiento, setFnacimiento] = useState(pacienteDatos.fnacimiento);
  const [sector, setSector] = useState(pacienteDatos.sector);
  const [direccion, setDireccion] = useState(pacienteDatos.direccion);
  const [telefono, setTelefono] = useState(pacienteDatos.telefono);
  const [celular, setCelular] = useState(pacienteDatos.celular);
  const [errorPatient, setErrorPatient] = useState("");

  const handleUpdatePatient = () => {
    if (
      !id ||
      !nombres ||
      !apellidos ||
      !sexo ||
      !fnacimiento ||
      !sector ||
      !direccion ||
      !telefono
    ) {
      setErrorPatient("Todos los campos son obligatorios.");
      return;
    }
    if (id.length < 6) {
      setErrorPatient("La identificación debe tener al menos 6 caracteres.");
      return;
    }
    if (nombres.length < 3) {
      setErrorPatient("El nombre debe tener al menos 3 caracteres.");
      return;
    }
    if (apellidos.length < 3) {
      setErrorPatient("El apellido debe tener al menos 3 caracteres.");
      return;
    }
    if (telefono.length !== 11) {
      setErrorPatient("El teléfono debe tener 11 dígitos.");
      return;
    }
    if (direccion.length < 10) {
      setErrorPatient("La dirección debe tener al menos 10 caracteres.");
      return;
    }

    Swal.fire({
      title: "Confirmar Actualización",
      text: "¿Estás seguro de que deseas actualizar los datos del paciente?",
      icon: "question",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Lógica para actualizar los datos
        console.log("Datos actualizados:", {
          id,
          nombres,
          apellidos,
          sexo,
          fnacimiento,
          sector,
          direccion,
          telefono,
          celular,
        });
        setErrorPatient("");

        Swal.fire(
          "Actualizado!",
          "Los datos del paciente han sido actualizados exitosamente.",
          "success"
        );
      }
    });
  };

  //TODO Buscar tratamiento con id
  const [treatmentsData, setTreatmentsData] = useState([
    {
      treatmentId: "1",
      med: "Losartan",
      presentation: "500mg",
      quantity: "30",
      date: "26/09/2024",
    },
    {
      treatmentId: "2",
      med: "Prednisona",
      presentation: "300mg",
      quantity: "30",
      date: "26/09/2024",
    },
    {
      treatmentId: "3",
      med: "Xanax",
      presentation: "600mg",
      quantity: "60",
      date: "26/09/2024",
    },
    {
      treatmentId: "4",
      med: "Insulina",
      presentation: "500ml",
      quantity: "20",
      date: "26/09/2024",
    },
  ]);

  const [showNewTreatment, setShowNewTreatment] = useState(false);

  const handleOpenTreatment = () => setShowNewTreatment(true);
  const handleCloseTreatment = () => setShowNewTreatment(false);

  const handleDeleteTreatment = (treatmentId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Tratamiento eliminado: " + treatmentId);
        //TODO Lógica para eliminar el tratamiento
        setTreatmentsData((prevData) =>
          prevData.filter((item) => item.treatmentId !== treatmentId)
        );
        Swal.fire("Eliminado", "El tratamiento ha sido eliminado.", "success");
        ha;
      }
    });
  };

  const [inputMed, setInputMed] = useState("");
  const [startDate, setStartDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMed, setErrorMed] = useState("");

  const handleChangeMed = (e) => {
    setInputMed(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSaveMed = () => {
    if (!inputMed || !startDate || !quantity) {
      setErrorMed("Todos los campos son obligatorios.");
      return;
    }
    if (inputMed.length < 3) {
      setErrorMed(
        "El nombre del medicamento debe tener al menos 3 caracteres."
      );
      return;
    }
    if (quantity <= 0) {
      setErrorMed("La cantidad mensual debe ser mayor que 0.");
      return;
    }

    Swal.fire({
      title: "Confirmar Guardado",
      text: "¿Estás seguro de que deseas guardar el nuevo tratamiento?",
      icon: "question",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Lógica para guardar el nuevo tratamiento
        console.log("Nuevo tratamiento agregado:", {
          inputMed,
          startDate,
          quantity,
        });
        setErrorMed("");
        handleCloseTreatment();

        Swal.fire(
          "Guardado!",
          "El nuevo tratamiento ha sido guardado exitosamente.",
          "success"
        );
      }
    });
  };

  //TODO Buscar diagnósticos con id
  const initialDiagnosisData = [
    {
      id: 1,
      illness: "Diabetes",
      classification: "Estadio I",
      notes: "Heriditaria",
      treatment: "",
    },
    {
      id: 2,
      illness: "Hipertensión",
      classification: "Estadio II",
      notes: "",
      treatment: "",
    },
  ];

  const [diagnosisData, setDiagnosisData] = useState(initialDiagnosisData);

  const handleDiagnosisChange = (id, field, value) => {
    const newDiagnosisData = diagnosisData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setDiagnosisData(newDiagnosisData);
  };

  const [showNewDiagnosis, setShowNewDiagnosis] = useState(false);

  const handleOpenDiagnosis = () => setShowNewDiagnosis(true);
  const handleCloseDiagnosis = () => setShowNewDiagnosis(false);
  const [illness, setIllness] = useState("");
  const [classification, setClassification] = useState("-");
  const [notes, setNotes] = useState("");
  const [treatment, setTreatment] = useState("");
  const [errorDiagnosis, setErrorDiagnosis] = useState("");

  const handleSaveDiagnosis = () => {
    if (!illness) {
      setErrorDiagnosis("El nombre de la enfermedad es obligatorio.");
      return;
    }

    if (illness.length < 3) {
      setErrorDiagnosis(
        "El nombre de la enfermedad debe tener por lo menos 3 caracteres."
      );
      return;
    }

    Swal.fire({
      title: "Confirmar Guardado",
      text: "¿Estás seguro de que deseas guardar el nuevo diagnóstico?",
      icon: "question",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Lógica para guardar el nuevo diagnóstico
        console.log("Nuevo diagnóstico agregado:", {
          illness,
          classification,
          notes,
          treatment,
        });
        handleCloseDiagnosis();

        Swal.fire(
          "Guardado!",
          "El nuevo diagnóstico ha sido guardado exitosamente.",
          "success"
        );
      }
    });
  };

  const handleDiagnosisUpdate = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas actualizar este diagnóstico?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedDiagnosis = diagnosisData.find((item) => item.id === id);
        //TODO Lógica para actualizar diagnóstico
        console.log("Diagnóstico actualizado:", updatedDiagnosis);

        Swal.fire(
          "Actualizado",
          "El diagnóstico ha sido actualizado.",
          "success"
        );
      }
    });
  };

  const handleDiagnosisDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el diagnóstico del estado
        setDiagnosisData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );

        // Mensaje de confirmación después de eliminar
        Swal.fire("Eliminado", "El diagnóstico ha sido eliminado.", "success");
      }
    });
  };

  //TODO Buscar antecedentes con id
  const initialAntecedentesData = {
    encamado: false,
    diabetes: true,
    dislipidemia: false,
    obesidad: true,
    erc: false,
    iam: false,
    acv: false,
    fumador: false,
    alergias: "Maní",
    observaciones: "",
  };

  const conditions = [
    "Encamado",
    "Diabetes",
    "Dislipidemia",
    "Obesidad",
    "ERC",
    "IAM",
    "ACV",
    "Fumador",
  ];

  const [antecedentesData, setAntecedentesData] = useState(
    initialAntecedentesData
  );
  const handleCheckboxChange = (condition) => {
    setAntecedentesData({
      ...antecedentesData,
      [condition.toLowerCase()]: !antecedentesData[condition.toLowerCase()],
    });
  };

  const handleAntecedentesChange = (field, value) => {
    setAntecedentesData({
      ...antecedentesData,
      [field]: value,
    });
  };

  const handleUpdateAntecedentes = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas actualizar los antecedentes?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
    }).then((result) => {
      if (result.isConfirmed) {
        //TODO Lógica para actualizar antecedentes
        console.log("Antecedentes actualizados:", antecedentesData);

        Swal.fire(
          "Actualizado",
          "Los antecedentes han sido actualizados.",
          "success"
        );
      }
    });
  };

  const dataEntregas = [
    { Medicamento: "Losartan", Cantidad: "30", Entregado: "26/09/2024" },
    { Medicamento: "Prednisona", Cantidad: "30", Entregado: "26/09/2024" },
    { Medicamento: "Xanax", Cantidad: "60", Entregado: "26/09/2024" },
    { Medicamento: "Insulina", Cantidad: "20", Entregado: "26/09/2024" },
  ];

  const headers = ["Medicamento", "Cantidad", "Entregado"];

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="header-container"
        style={{
          justifyContent: "space-between",
        }}
      >
        <h2>Historia médica</h2>
        <Button
          children="Volver"
          onClick={() => backClick("patients")}
          variant={"outline"}
        />
      </div>

      <p>Datos del paciente</p>
      <div className="form-container-user">
        <div className="form-row">
          <div className="form-group">
            <i className="icon-form">
              <FaAddressCard />
            </i>
            <InputField
              label={"Identificación"}
              id={"documento"}
              type={"text"}
              className={"history form"}
              value={id}
              onChange={(e) => setId(e.target.value)}
              onlyNumbers={true}
              maxLength={8}
            />
          </div>
          <div className="form-group">
            <i className="icon-form">
              <FaUser />
            </i>
            <InputField
              label={"Nombre"}
              id={"name"}
              type={"text"}
              className={"history form"}
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              onlyLetters={true}
              maxLength={30}
            />
          </div>
          <div className="form-group">
            <i className="icon-form">
              <FaUser />
            </i>
            <InputField
              label={"Apellido"}
              id={"last-name"}
              type={"text"}
              className={"history form"}
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              onlyLetters={true}
              maxLength={30}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <i className="icon-form">
              <BsGenderAmbiguous />
            </i>
            <select
              name="gender"
              className="select history"
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="form-group">
            <i className="icon-form">
              <BsFillCalendarDateFill />
            </i>
            <InputField
              label={"Fecha de nacimiento"}
              id={"birthdate"}
              type={"date"}
              className={"history form"}
              value={fnacimiento}
              onChange={(e) => setFnacimiento(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <i className="icon-form">
              <FaLocationDot />
            </i>
            <select
              name="select"
              className="select history"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            >
              {sectores.map((sector, index) => (
                <option key={index} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <i className="icon-form">
              <FaHouse />
            </i>
            <InputField
              label={"Dirección"}
              id={"address"}
              type={"text"}
              className={"history form"}
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              maxLength={100}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <i className="icon-form">
              <FaPhone />
            </i>
            <InputField
              label={"Teléfono"}
              id={"phone"}
              type={"text"}
              className={"history form"}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              onlyNumbers={true}
              maxLength={11}
            />
          </div>
          <div className="form-group">
            <i className="icon-form">
              <MdOutlinePhoneAndroid />
            </i>
            <InputField
              label={"Celular"}
              id={"cellphone"}
              type={"text"}
              className={"history form"}
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              onlyNumbers={true}
              maxLength={11}
            />
          </div>
        </div>
        <div className="update">
          <Button
            children={"Actualizar"}
            variant={"primary"}
            onClick={handleUpdatePatient}
          />
        </div>
        {errorPatient && <div className="error-message">{errorPatient}</div>}
      </div>

      <p>Tratamientos</p>
      <div className={"section treatments"}>
        {treatmentsData.map((item, index) => (
          <RowTreatment
            med={item.med}
            date={item.date}
            quantity={item.quantity}
            presentation={item.presentation}
            treatmentId={item.treatmentId}
            onDelete={handleDeleteTreatment}
          />
        ))}
        <div className={"center"}>
          <Button
            children={"Agregar tratamiento"}
            variant={"primary"}
            onClick={handleOpenTreatment}
          />
        </div>
      </div>
      <Modal show={showNewTreatment} handleClose={handleCloseTreatment}>
        <h2>Agregar Nuevo Tratamiento</h2>
        <InputField
          type="text"
          label={"Medicamento"}
          value={inputMed}
          onChange={handleChangeMed}
          suggestions={meds}
          onlyAlphanumeric={true}
          maxLength={50}
        />
        <InputField
          type="date"
          label={"Fecha de inicio"}
          value={startDate}
          onChange={handleStartDateChange}
        />
        <InputField
          type="number"
          label={"Cantidad mensual"}
          value={quantity}
          onChange={handleQuantityChange}
          onlyNumbers={true}
          maxLength={3}
        />
        <div className={"center"}>
          <Button
            variant={"primary"}
            children={"Guardar"}
            onClick={handleSaveMed}
          />
        </div>
        {errorMed && (
          <div style={{ color: "red", textAlign: "center" }}>{errorMed}</div>
        )}
      </Modal>

      <p>Diagnósticos actuales</p>
      <div className={"section"}>
        {diagnosisData.map((item, index) => (
          <Diagnosis
            key={item.id}
            id={item.id}
            illness={item.illness}
            classification={item.classification}
            notes={item.notes}
            treatment={item.treatment}
            onIllnessChange={(e) =>
              handleDiagnosisChange(index, "illness", e.target.value)
            }
            onClassificationChange={(e) =>
              handleDiagnosisChange(index, "classification", e.target.value)
            }
            onNotesChange={(e) =>
              handleDiagnosisChange(index, "notes", e.target.value)
            }
            onTreatmentChange={(e) =>
              handleDiagnosisChange(index, "treatment", e.target.value)
            }
            onUpdate={() => handleDiagnosisUpdate(item.id)}
            onDelete={() => handleDiagnosisDelete(item.id)}
          />
        ))}
        <div className={"center"}>
          <Button
            children={"Agregar diagnóstico"}
            variant={"primary"}
            onClick={handleOpenDiagnosis}
          />
        </div>
      </div>
      <Modal show={showNewDiagnosis} handleClose={handleCloseDiagnosis}>
        <h2>Agregar Nuevo Diagnóstico</h2>
        <InputField
          label="Enfermedad"
          value={illness}
          onChange={(e) => setIllness(e.target.value)}
          onlyLetters={true}
          maxLength={30}
        />
        <div className="input-row">
          <select
            name="classification"
            className="select history"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
          >
            <option value="-">-</option>
            <option value="Estadio I">Estadio I</option>
            <option value="Estadio II">Estadio II</option>
            <option value="Estadio III">Estadio III</option>
          </select>
          <InputField
            label="Observaciones"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="input-full-width">
          <InputField
            label="Tratamiento"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />
        </div>
        <div className={"center"}>
          <Button
            variant={"primary"}
            children={"Guardar"}
            onClick={handleSaveDiagnosis}
          />
        </div>
        {errorDiagnosis && (
          <div style={{ color: "red", textAlign: "center" }}>
            {errorDiagnosis}
          </div>
        )}
      </Modal>

      <p>Antecedentes</p>
      <div className="section">
        <div className="antecedentes">
          <div className="flex-wrap-antecedentes">
            {conditions.map((condition, index) => (
              <label
                key={index}
                className="checkbox-label flex-item-antecedentes"
              >
                <input
                  type="checkbox"
                  value={condition}
                  checked={antecedentesData[condition.toLowerCase()]}
                  onChange={() => handleCheckboxChange(condition)}
                />
                <span className="checkbox-custom margin-left-antecedentes"></span>
                {condition}
              </label>
            ))}
          </div>
          <InputField
            label="Alergias"
            value={antecedentesData.alergias}
            onChange={(e) =>
              handleAntecedentesChange("alergias", e.target.value)
            }
          />
          <InputField
            label="Observaciones"
            value={antecedentesData.observaciones}
            onChange={(e) =>
              handleAntecedentesChange("observaciones", e.target.value)
            }
          />
        </div>
        <div className="update">
          <Button
            children="Actualizar"
            variant="primary"
            onClick={handleUpdateAntecedentes}
          />
        </div>
      </div>

      <More
        title={"Historial de entregas"}
        infoComponent={
          <div style={{ width: "90%", margin: "auto" }}>
            <Table data={dataEntregas} headers={headers} />
          </div>
        }
      />
    </div>
  );
}

export default History;
