import React, { useState } from "react";
import Button from "./Button";
import { FaAddressCard, FaPhone, FaUser } from "react-icons/fa6";
import InputField from "./InputField";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Swal from "sweetalert2";

function NewAdmin({ backClick }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (
      !name ||
      !lastName ||
      !document ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
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
    if (document.length < 6) {
      setError("La identificación debe tener al menos 6 caracteres.");
      return;
    }
    if (phone.length !== 11) {
      setError("El teléfono debe tener 11 dígitos.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("El correo no es válido.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const newAdmin = {
      name,
      lastName,
      document,
      phone,
      email,
      password,
    };

    Swal.fire({
      title: "Confirmar Información",
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Apellido:</strong> ${lastName}</p>
        <p><strong>Documento:</strong> ${document}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Correo:</strong> ${email}</p>
      `,
      icon: "info",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        console.log("Nuevo administrador creado:", newAdmin);
        // TODO: Lógica para guardar el nuevo administrador
        setError("");
        Swal.fire(
          "¡Administrador Creado!",
          "El nuevo administrador ha sido creado exitosamente.",
          "success"
        ).then(() => {
          // Limpiar los campos después de mostrar el mensaje de éxito
          setName("");
          setLastName("");
          setDocument("");
          setPhone("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
      },
    });
  };

  return (
    <div>
      <div className="header-container">
        <h2>Crear nuevo administrador</h2>
      </div>
      <br />
      <div className="form-container-user">
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
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={error && !name ? error : ""}
            />
          </div>
          <div className="form-group">
            <i className="icon-form">
              <FaUser />
            </i>
            <InputField
              label={"Apellidos"}
              id={"lastName"}
              type={"text"}
              className={"login form"}
              onlyLetters={true}
              maxLength={30}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={error && !lastName ? error : ""}
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
              id={"document"}
              type={"text"}
              className={"login form"}
              onlyNumbers={true}
              maxLength={8}
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              error={error && !document ? error : ""}
            />
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
              error={error && !phone ? error : ""}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <i className="icon-form">
              <MdEmail />
            </i>
            <InputField
              label={"Correo"}
              id={"email"}
              type={"email"}
              className={"login form"}
              validateEmail={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? error : ""}
            />
          </div>
          <div className="form-group">
            <i className="icon-form">
              <FaLock />
            </i>
            <InputField
              label={"Contraseña"}
              id={"password"}
              type={"password"}
              className={"login form"}
              maxLength={16}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? error : ""}
            />
          </div>
        </div>
        <div className="form-row single">
          <div className="form-group">
            <i className="icon-form">
              <FaLock />
            </i>
            <InputField
              label={"Confirmar contraseña"}
              id={"confirmPassword"}
              type={"password"}
              className={"login form password-confirm"}
              maxLength={16}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={error && password !== confirmPassword ? error : ""}
            />
          </div>
        </div>
        <br />
        {error && <div className="error-message">{error}</div>}
        <div className="button-container">
          <Button children="Cancelar" onClick={() => backClick("create")} />
          <Button children="Guardar" variant={"primary"} onClick={handleSave} />
        </div>
      </div>
      <br />
    </div>
  );
}

export default NewAdmin;
