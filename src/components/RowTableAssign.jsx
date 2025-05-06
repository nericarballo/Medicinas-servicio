import "../stylesheets/Rowtable.css";
import Button from "./Button";

function RowtableAssign({
  treatmentId,
  priority,
  id,
  name,
  med,
  quantity,
  date1,
  date2,
  available,
  setModal,
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
      <span className="column quantity-column-assign">{quantity} und</span>
      <span className="column date-column-assign">{date1}</span>
      <span className="column date-column-assign">{date2}</span>
      <div className="actions-column">
        <Button
          variant={available ? "primary" : "secondary"}
          children={"Asignar"}
          onClick={() => setModal(treatmentId)}
          disabled={!available}
        />
      </div>
    </div>
  );
}

export default RowtableAssign;
