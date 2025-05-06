import { RiHealthBookFill } from "react-icons/ri";
import Button from "./Button";
import { GiMedicines } from "react-icons/gi";
import "../stylesheets/Items.css";

function ItemHome({ onClick }) {
  return (
    <div className="card-container">
      <div className="card-create shadow">
        <i className="icon shadow">
          <GiMedicines />
        </i>
        <h1 className="card-title">Medicinas</h1>
        <Button
          variant={"primary"}
          children={"Crear"}
          onClick={() => onClick("medicina")}
          className="create-button"
        />
      </div>
      <div className="card-create shadow">
        <i className="icon shadow">
          <RiHealthBookFill />
        </i>
        <h1 className="card-title">Enfermedades</h1>
        <Button
          variant={"primary"}
          children={"Crear"}
          onClick={() => onClick("enfermedad")}
          className="create-button"
        />
      </div>
    </div>
  );
}

export default ItemHome;
