import { useState } from "react";
import CardCreateUser from "./CardCreateUser";
import NewPatient from "./NewPatient";
import NewDonor from "./NewDonor";
import NewAdmin from "./NewAdmin";

function RegisterUser() {
  const [page, setPage] = useState("create");

  const handleClick = (option) => {
    setPage(option);
  };

  return (
    <>
      {page === "create" ? (
        <div className="create-container">
          <CardCreateUser txt="pacientes" count={68} onClick={handleClick} />
          <CardCreateUser txt="donantes" count={7} onClick={handleClick} />
          <CardCreateUser
            txt="administradores"
            count={3}
            onClick={handleClick}
          />
        </div>
      ) : null}

      {page === "pacientes" ? <NewPatient backClick={handleClick} /> : null}
      {page === "donantes" ? <NewDonor backClick={handleClick} /> : null}
      {page === "administradores" ? <NewAdmin backClick={handleClick} /> : null}
    </>
  );
}

export default RegisterUser;
