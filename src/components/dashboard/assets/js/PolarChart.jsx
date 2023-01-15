import React from "react";
import { PolarArea } from "react-chartjs-2";

function PolarChart({ chartData }) {
  return <PolarArea data={chartData} />;
}

export default PolarChart;