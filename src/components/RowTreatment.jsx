import { FaPencil, FaTrash } from "react-icons/fa6";
import "../stylesheets/History.css";

function RowTreatment({
  med,
  quantity,
  date,
  presentation,
  onDelete,
  treatmentId,
}) {
  return (
    <div className="medication-card shadow">
      <span className="medication-info">{med}</span>
      <span className="medication-info">{presentation}</span>
      <span className="medication-info">{quantity} uds.</span>
      <span className="medication-info">{date}</span>
      <div className="action-container">
        <button
          className="action-btn delete-btn"
          aria-label="Delete"
          onClick={() => onDelete(treatmentId)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default RowTreatment;
