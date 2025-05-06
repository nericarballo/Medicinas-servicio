import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const CustomPie = ({ data, title, color, size }) => {
  const colors = {
    yellow: ["#FFFF00", "rgba(255, 255, 0, 0.3)"],
    red: ["#FF0000", "rgba(255, 0, 0, 0.3)"],
    green: ["#00FF00", "rgba(0, 255, 0, 0.3)"],
  };
  const selectedColors = colors[color] || colors.azul;
  const coloredData = data.map((item, index) => ({
    ...item,
    color: index === 0 ? selectedColors[0] : selectedColors[1],
  }));

  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  const percentage = ((data[0].value / totalValue) * 100).toFixed(0);
  return (
    <div
      className={"custom-pie"}
      style={{ position: "relative", width: { size }, height: { size } }}
    >
      <PieChart
        series={[
          {
            data: coloredData,
            innerRadius: "50%",
            outerRadius: "100%",
            arcLabel: () => null,
          },
        ]}
        width={size}
        height={size}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-150%, -10%)",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {percentage}%
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "-40px",
          marginLeft: "-100px",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default CustomPie;
