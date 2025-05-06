import { useState } from "react";
import Swal from "sweetalert2";
import { FaUser, FaUsers, FaAddressCard, FaLock } from "react-icons/fa";
import Button from "./Button";
import InputField from "./InputField";
import { LocalStorage } from "../utils/LocalStorage";
import { AdminApi } from "../api/adminApi";

function NewDonor({ backClick }) {
  const [name, setName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [identification, setIdentification] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const donorTypes = ["ONG", "Gubernamental", "Privada", "Natural"];

  const crearDonador = async (
    name,
    organizationType,
    identification,
    email
  ) => {
    const jwt = LocalStorage.Get("token");
    if (!jwt) {
      return;
    }
    const res = await AdminApi.createDonor(
      jwt,
      name,
      organizationType,
      identification,
      email
    );
    console.log("creado", res);
  };

  const handleSave = () => {
    if (!name || !organizationType || !identification) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (name.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }
    if (identification.length < 6) {
      setError("La identificación debe tener al menos 6 caracteres.");
      return;
    }
    // if (password.length < 6) {
    //   setError("La contraseña debe tener al menos 6 caracteres.");
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   setError("Las contraseñas no coinciden.");
    //   return;
    // }

    Swal.fire({
      title: "Confirmar Información",
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Tipo de Organización:</strong> ${organizationType}</p>
        <p><strong>Identificación:</strong> ${identification}</p>
      `,
      icon: "info",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        // TODO Lógica para guardar al donante
        console.log("Nuevo donante creado:", {
          name,
          organizationType,
          identification,
          email,
        });

        crearDonador(name, organizationType, identification, email);
        setError("");
        // Resetear los campos después de guardar
        setName("");
        setOrganizationType("");
        setIdentification("");
        setEmail("");
        setConfirmPassword("");
        Swal.fire(
          "¡Usuario Creado!",
          "El nuevo donante ha sido creado exitosamente.",
          "success"
        );
      },
    });
  };

  return (
    <div>
      <div className="header-container">
        <h2>Crear nuevo donante</h2>
      </div>
      <br />
      <div className="form-container-user">
        <div className="form-column">
          <div className="form-group center">
            <i className="icon-form">
              <FaUser />
            </i>
            <InputField
              label={"Nombre"}
              id={"name"}
              type={"text"}
              className={"login form"}
              onlyLetters={true}
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group center">
            <i className="icon-form">
              <FaUsers />
            </i>
            <select
              className="select"
              value={organizationType}
              onChange={(e) => setOrganizationType(e.target.value)}
            >
              <option value="">Tipo de organización</option>
              {donorTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group center">
            <i className="icon-form">
              <FaAddressCard />
            </i>
            <InputField
              label={"Identificación"}
              id={"rif"}
              type={"text"}
              className={"login form"}
              onlyAlphanumeric={true}
              maxLength={11}
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
            />
          </div>
          <div className="form-group center">
            <i className="icon-form">
              <FaLock />
            </i>
            <InputField
              label={"Correo"}
              id={"email"}
              type={"email"}
              className={"login form"}
              maxLength={30}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div className="form-group center">
        <i className="icon-form">
          <FaLock />
        </i>
        <InputField
          label={"Confirmar contraseña"}
          id={"confirmPassword"}
          type={"password"}
          className={"login form"}
          maxLength={16}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div> */}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <br />
      <div className="button-container">
        <Button children="Cancelar" onClick={() => backClick("create")} />
        <Button children="Guardar" variant={"primary"} onClick={handleSave} />
      </div>
    </div>
  );
}

export default NewDonor;
