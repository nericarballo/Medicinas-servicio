import { FaPencil, FaTrash } from "react-icons/fa6";
import "../stylesheets/Rowtable.css";

function RowtableMedicine({ id, name, illness, updateClick, deleteClick }) {
  const getTagColor = (illness) => {
    switch (illness.toLowerCase()) {
      case "diabetes":
        return "#ff9999"; // Color para diabetes
      case "hipertension":
        return "#99ccff"; // Color para hipertensión
      default:
        return "#e0e0e0"; // Color por defecto
    }
  };
  return (
    <div className="flex-center-med">
      <div className="row-table shadow space-around-med width-70-med">
        <span className="column name-column">{name}</span>
        <div className="flex-50-med">
          {/* mapear aqui */}
          {illness.map((ill, index) => (
            <div key={index} className="flex-med">
              <div className={`tag-med ${getTagColor(ill)}`}>{ill}</div>
            </div>
          ))}
        </div>
        <div className="actions-column-table">
          <button
            className="action-btn delete-btn"
            aria-label="Delete"
            onClick={deleteClick}
          >
            <FaTrash />
          </button>
          <button
            className="action-btn edit-btn"
            aria-label="Edit"
            onClick={updateClick}
          >
            <FaPencil />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RowtableMedicine;
