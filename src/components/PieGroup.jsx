import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data = {
  losartan: [
    { id: 0, value: 40, label: "Usadas" },
    { id: 1, value: 30, label: "Vigentes" },
    { id: 2, value: 30, label: "Caducadas" },
  ],
  prednisona: [
    { id: 0, value: 50, label: "Usadas" },
    { id: 1, value: 20, label: "Vigentes" },
    { id: 2, value: 30, label: "Caducadas" },
  ],
  insulina: [
    { id: 0, value: 60, label: "Usadas" },
    { id: 1, value: 25, label: "Vigentes" },
    { id: 2, value: 15, label: "Caducadas" },
  ],
};

const PieGroup = () => {
  const [selectedMedications, setSelectedMedications] = useState({
    losartan: true,
    prednisona: true,
    insulina: true,
  });

  const handleCheckboxChange = (event) => {
    setSelectedMedications({
      ...selectedMedications,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {Object.keys(selectedMedications).map(
          (medication) =>
            selectedMedications[medication] && (
              <PieChart
                key={medication}
                series={[{ data: data[medication] }]}
                width={200}
                height={200}
              />
            )
        )}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {Object.keys(selectedMedications).map((medication) => (
          <label key={medication} style={{ margin: "0 10px" }}>
            <input
              type="checkbox"
              checked={selectedMedications[medication]}
              onChange={handleCheckboxChange}
              name={medication}
            />
            {medication.charAt(0).toUpperCase() + medication.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PieGroup;
