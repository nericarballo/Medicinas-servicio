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
import { GiMedicines } from "react-icons/gi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MedicineApi } from "../api/medicine";
import { LocalStorage } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { IllnessApi } from "../api/illness";
import "../stylesheets/Form.css";
import { SectorApi } from "../api/sector";
import { AdminApi } from "../api/adminApi";

function NewPatient({ backClick }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [sectores, setSectores] = useState([]);
  const [sector, setSector] = useState();
  const [meds, setMeds] = useState(["Prednisona", "Losartan", "Insulina"]);

  const [adminId, setAdminId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documento, setDocumento] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [phone, setPhone] = useState("");
  const [illness, setIllness] = useState("diabetes");
  const [med, setMed] = useState("");
  const [presentation, setPresentation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [priority, setPriority] = useState("");
  const [enfermedades, setEnfermedades] = useState([]);

  const handleSave = () => {
    if (!name || !lastName || !documento || !phone || !priority) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (name.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }
    if (lastName.length < 3) {
      setError("El apellido debe tener al menos 3 caracteres.");
      return;
    }
    if (documento.length < 6) {
      setError("La identificación debe tener al menos 6 caracteres.");
      return;
    }
    if (phone.length !== 11) {
      setError("El teléfono debe tener 11 dígitos.");
      return;
    }

    const newPatient = {
      adminId,
      name,
      lastName,
      documento,
      phone,
      priority,
      sector,
      address,
      sex,
      birthdate,
    };

    const newDiagnosis = {
      documento,
      illness,
    };

    const newTreatment = {
      documento,
      med,
      presentation,
      quantity,
    };

    Swal.fire({
      title: "Confirmar Información",
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Apellido:</strong> ${lastName}</p>
        <p><strong>Documento:</strong> ${documento}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Prioridad:</strong> ${priority}</p>
      `,
      icon: "info",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: async () => {
        //console.log("Nuevo paciente creado:", newPatient);
        //console.log("Diagnostico creado: ", newDiagnosis);
        //console.log("Tratamiento crrado: ", newTreatment);

        const jwt = LocalStorage.Get("token");

        await AdminApi.createPatient(
          jwt,
          illness,
          med,
          presentation,
          quantity,
          name,
          lastName,
          documento,
          birthdate,
          address,
          phone,
          sex,
          priority,
          adminId,
          sector
        );

        // TODO: Lógica para guardar el nuevo paciente
        /*1. Crear paciente y recuperar ID
        2. Crear relación paciente-enfermedad
        3. Buscar si existe la presentación del medicamento (medicina + gramos)
        3b. Crear presentación, si no existe
        4. Crear relación medicine_container - paciente */
        setError("");
        Swal.fire(
          "¡Paciente Creado!",
          "El nuevo paciente ha sido creado exitosamente.",
          "success"
        ).then(() => {
          // Limpiar los campos después de mostrar el mensaje de éxito

          setName("");
          setLastName("");
          setDocumento("");
          setPhone("");
          setPriority("");
          setBirthdate("");
          setSector(""); //null
          setAddress("");
          setSex("");
          setMed("");
          setPresentation("");
          setQuantity("");
        });
      },
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
        const res = await MedicineApi.getMedicines(jwt);
        const enfer = await IllnessApi.getIllness(jwt);
        const sec = await SectorApi.getSector(jwt);
        const admin = await AdminApi.getUserme(jwt);

        setAdminId(admin.id);
        setMeds(res);
        setEnfermedades(enfer);
        setSectores(sec);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="header-container">
        <h2>Crear nuevo paciente</h2>
      </div>
      <p>Paciente</p>
      <div className="form-container-user">
        <div className="form-row">
          <div className="form-group">
            <select
              name="select"
              className="select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="0">Seleccionar prioridad</option>
              <option value="1">Alta</option>
              <option value="2">Media</option>
              <option value="3">Baja</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <i className="icon-form">
              <FaUser />
            </i>
            <InputField
              label={"Nombres"}
              id={"name"}
              type={"text"}
              className={"login form"}
              onlyLetters={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <i className="icon-form">
              <FaUser />
            </i>
            <InputField
              label={"Apellidos"}
              id={"last-name"}
              type={"text"}
              className={"login form"}
              onlyLetters={true}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <i className="icon-form">
              <FaAddressCard />
            </i>
            <InputField
              label={"Identificación"}
              id={"documento"}
              type={"text"}
              className={"login form"}
              onlyNumbers={true}
              maxLength={8}
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>
          <div className="form-group">
            <i className="icon-form">
              <BsFillCalendarDateFill />
            </i>
            <InputField
              label={"Fecha de nacimiento"}
              id={"birthdate"}
              type={"date"}
              className={"login form"}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
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
              className="select"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            >
              <option value="0">Seleccionar sector</option>
              {sectores.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
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
              className={"login form"}
              maxLength={100}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <i className="icon-form">
              <BsGenderAmbiguous />
            </i>
            <select
              name="sex"
              className="select"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="0">Sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="form-group">
            <i className="icon-form">
              <FaPhone />
            </i>
            <InputField
              label={"Teléfono"}
              id={"phone"}
              type={"text"}
              className={"login form"}
              onlyNumbers={true}
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      <p>Enfermedad</p>
      <div className="illness-container">
        <div className="illness-options">
          {enfermedades.map((e) => (
            <div key={e.id} className="illness-option">
              <input
                type="radio"
                id={e.id}
                name="illness"
                value={e.id}
                checked={illness === e.id}
                onChange={(e) => setIllness(e.target.value)}
              />
              <label htmlFor={e.name}>{e.name}</label>
            </div>
          ))}
        </div>
        <div className="center">
          <p className="note">Seleccione una. Luego podrá registrar más.</p>
        </div>
      </div>

      <p>Tratamiento</p>
      <div className="treatment-container">
        <div className="form-row">
          <div className="form-group">
            <i className="icon-form">
              <GiMedicines />
            </i>
            <select
              name="select"
              className="select"
              value={med}
              onChange={(e) => setMed(e.target.value)}
            >
              <option value="0">Seleccionar medicamento</option>
              {meds.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.name}
                </option>
              ))}
            </select>
            <InputField
              label={"(g.)"}
              id={"presentation"}
              type={"text"}
              className={"form"}
              onlyNumbers={true}
              maxLength={3}
              value={presentation}
              onChange={(e) => setPresentation(e.target.value)}
            />
            <InputField
              label={"cantidad (mensual)"}
              id={"quantity"}
              type={"text"}
              className={"form"}
              onlyNumbers={true}
              maxLength={3}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="center">
          <p className="note">Ingrese un tratamiento. Luego podrá crear más.</p>
        </div>
      </div>

      <br />

      {error && <div className="error-message">{error}</div>}

      <div className="button-container">
        <Button children="Cancelar" onClick={() => backClick("create")} />
        <Button children="Guardar" variant={"primary"} onClick={handleSave} />
      </div>
    </div>
  );
}

export default NewPatient;
