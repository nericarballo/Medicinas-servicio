import Button from "./Button";
import { FaUser } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import "../stylesheets/Form.css";

function CardCreateUser({ txt, count, onClick }) {
  const iconMap = {
    pacientes: <FaUser />,
    donantes: <FaHandHoldingMedical />,
    administradores: <MdAdminPanelSettings />,
  };
  return (
    <div className="card-create shadow">
      <i className="icon-user shadow">{iconMap[txt]}</i>
      <h1 className="count">{count}</h1>
      <div className="text-user">{txt}</div>
      <Button
        variant={"primary"}
        children={"Crear"}
        onClick={() => onClick(txt)}
        className="create-button"
      />
    </div>
  );
}

export default CardCreateUser;
