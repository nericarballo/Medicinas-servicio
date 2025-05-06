import "../stylesheets/Home.css";
import Tabs from "../components/Tabs.jsx";
import InputField from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../api/adminApi.js";
import React, { useState, useEffect } from "react";
import { LocalStorage } from "../utils/LocalStorage.js";
import { useTheme } from '../utils/ThemeContext';
import {BsFillMoonStarsFill, BsFillSunFill} from "react-icons/bs";

const Login = () => {
  const Ingresar = () => {
    const [documento, setDocumento] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          handleButtonClick();
        }
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [documento, contrasena]);

    const handleInputChange = (e) => {
      setDocumento(e.target.value);
      setError(""); // Limpiar el mensaje de error al cambiar el input
    };

    const handleContrasenaChange = (e) => {
      setContrasena(e.target.value);
      setError(""); // Limpiar el mensaje de error al cambiar el input
    };

    const clickLogin = async () => {
      setIsLoading(true);

      const res = await AdminApi.login(documento, contrasena);

      if (documento === "12345678" && contrasena === "12345678") {
        //simulacion de login donante
        window.location.href = "/donante";
        return;
      }

      if (!res.ok) {
        setError(res.msg);
        setIsLoading(false);

        return;
      }

      window.location.href = "/dashboard";
    };

    const handleButtonClick = () => {
      if (documento.length < 6) {
        setError("El documento debe tener al menos 6 caracteres.");
      } else if (contrasena.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        console.log("Iniciar sesión con:", { documento, contrasena });

        clickLogin();
      }
    };

    return (
      <div className="login-container">
        <h4>Documento</h4>
        <InputField
            label={"Cédula o RIF"}
            id={"documento"}
            type={"text"}
            className={"login"}
            onlyAlphanumeric={true}
            maxLength={11}
            helperText={"Ingrese su RIF sin guiones"}
            value={documento}
            onChange={handleInputChange}
        />
        <h4>Contraseña</h4>
        <InputField
          label={"Ingrese su contraseña"}
          id={"contrasena"}
          type={"password"}
          className={"login"}
          maxLength={16}
          value={contrasena}
          onChange={handleContrasenaChange}
        />
        {error && <div className="error-message">{error}</div>}
        <div className="center">
          <Button
            variant={"primary"}
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </div>
      </div>
    );
  };

  const Consultar = () => {
    const [documento, setDocumento] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          handleButtonClick();
        }
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [documento]);

    const handleInputChange = (e) => {
      setDocumento(e.target.value);
      setError(""); // Limpiar el mensaje de error al cambiar el input
    };

    const handleButtonClick = () => {
      if (documento.length < 6) {
        setError("El documento debe tener al menos 6 caracteres.");
      } else {
        // Aquí puedes manejar la lógica de búsqueda
        console.log("Buscar documento:", documento);

        // Simulación de verificación de donante o paciente
        const esPaciente = verificarPaciente(documento);

        if (esPaciente) {
          navigate("/consulta");
        } else {
          setError("Beneficiario no encontrado.");
        }
      }
    };

    // Función simulada para verificar si el documento pertenece a un paciente
    const verificarPaciente = (doc) => {
      const pacientes = ["789012", "345678", "901234"]; // Ejemplo de documentos de pacientes
      return pacientes.includes(doc);
    };

    return (
      <div className="login-container">
        <h4>Documento</h4>
        <InputField
            label={"Ingrese su cédula"}
            id={"documento"}
            type={"text"}
            className={"login"}
            value={documento}
            onChange={handleInputChange}
        />
        {error && <div className="error-message">{error}</div>}
        <div className="center">
          <Button variant={"primary"} onClick={handleButtonClick}>
            Consultar
          </Button>
        </div>
      </div>
    );
  };

  const tabs = [
    { label: "Consultar", content: <Consultar /> },
    { label: "Ingresar", content: <Ingresar /> },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};


export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Usa el contexto del tema

  useEffect(() => {
    const validate = async () => {
      const jwt = LocalStorage.Get("token");
      if (jwt) {
        const res = await AdminApi.getUserme(jwt);

        if (res.is_admin) {
          window.location.href = "/dashboard";
          return;
        }
      }
      setIsAuthorized(true);
    };
    validate();
  }, []);

  if (!isAuthorized) {
    return null;
  }

  return (
      <div className={"home"}>
        <div className={"welcome"}>
          <h1>Llevando salud a los más necesitados</h1>
          <div className={"center"}>
            <img
                src="https://www.nicepng.com/png/detail/204-2049937_logo-de-farmacia-png.png"
                alt="Logo de Farmacia"
            />
          </div>
          <div className={"center"}>
            <Button
                variant={"primary"}
                children={"Preguntas frecuentes"}
                onClick={() => navigate("/preguntas-frecuentes")}
            />
          </div>
          <div className={"center"}>
            <Button
                variant={"secondary"}
                children={theme === 'dark' ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
                onClick={toggleTheme}
            />
          </div>
        </div>
        <div className={"container"}>
          <Login />
        </div>
      </div>
  );
}