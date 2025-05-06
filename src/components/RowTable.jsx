import { FaTrash } from "react-icons/fa6";
import "../stylesheets/Rowtable.css";
import { FaCalendarCheck } from "react-icons/fa";

function Rowtable({
  treatmentId,
  priority,
  id,
  name,
  med,
  quantity,
  lote,
  date,
  onDelete,
  onCheck,
}) {
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

  return (
    <div className="row-table shadow">
      <div className={`priority-indicator ${getPrioriClass(priority)}`}></div>
      <span className="column id-column">{id}</span>
      <span className="column name-column">{name}</span>
      <span className="column med-column">{med}</span>
      <span className="column quantity-column">{quantity} und</span>
      <span className="column lote-column">#{lote}</span>
      <span className="column date-column">{date}</span>
      <div className="actions-column-table">
        <button
          className="action-btn delete-btn"
          aria-label="Delete"
          onClick={() => onDelete(treatmentId)}
        >
          <FaTrash />
        </button>
        <button
          className="action-btn edit-btn"
          aria-label="Check"
          onClick={() => onCheck(treatmentId)}
        >
          <FaCalendarCheck />
        </button>
      </div>
    </div>
  );
}

export default Rowtable;
