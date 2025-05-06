import { BarChart } from "@mui/x-charts";
import React from "react";

const BarHorizontal = () => {
  return (
    <div>
      <BarChart
        series={[{ data: chartData }]}
        yAxis={[{ data: regions, scaleType: "band", barGapRatio: 1.0 }]}
        height={200}
        width={600}
        layout={"horizontal"}
      />
    </div>
  );
};

export default BarHorizontal;
