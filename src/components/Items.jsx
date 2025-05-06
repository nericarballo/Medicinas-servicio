import { useState } from "react";
import ItemHome from "./ItemHome";
import Medicine from "./Medicine";
import Illness from "./Illness";

function Items() {
  const [view, setView] = useState("ItemHome");
  return (
    <>
      {view === "ItemHome" ? <ItemHome onClick={setView} /> : null}
      {view === "medicina" ? <Medicine clickBack={setView} /> : null}
      {view === "enfermedad" ? <Illness clickBack={setView} /> : null}
    </>
  );
}

export default Items;
