import Button from "./Button";
import Swal from "sweetalert2";
import { calculatePriority } from "../utils/utils";
import "../stylesheets/Inventory.css";

function RowInventory({ id, gm, name, med, quantity, date, onDelete }) {
  const priority = calculatePriority(date);

  const getPrioriClass = (priority) => {
    switch (priority) {
      case 1:
        return "priority-red";
      case 2:
        return "priority-yellow";
      case 3:
        return "priority-green";
      default:
        return "";
    }
  };

  const handleDelete = (id) => {
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
        onDelete(id);
        Swal.fire("Eliminado!", "El medicamento ha sido eliminado.", "success");
      }
    });
  };

  return (
    <div className="row-table">
      <div className={`priority-indicator ${getPrioriClass(priority)}`}></div>
      <span className="column name-column">{name}</span>
      <span className="column gm-column">{gm}</span>
      <span className="column med-column">#{med}</span>
      <span className="column date-column">{date}</span>
      <span className="column quantity-column">{quantity}und</span>
      <div className="actions-column-inventory">
        {priority === 1 ? (
          <Button
            variant={"primary"}
            children={"Devolver"}
            onClick={() => handleDelete(id)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default RowInventory;
