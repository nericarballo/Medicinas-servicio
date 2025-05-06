import Button from "./Button";
import TableMedicine from "./TableMedicine";
import "../stylesheets/Items.css";

function Medicine({ clickBack }) {
  return (
    <>
      <div className="header-container">
        <h2>Medicinas</h2>
        <Button
          children={"Volver"}
          variant={"primary"}
          onClick={() => clickBack("ItemHome")}
        />
      </div>
      <br />
      <div className="content-container">
        <TableMedicine />
      </div>
    </>
  );
}

export default Medicine;
