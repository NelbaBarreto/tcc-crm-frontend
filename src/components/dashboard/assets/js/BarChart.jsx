import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData, title }) => {
  return (
    <Bar
      data={chartData}
      options={{
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: title
          }
        }
      }} />
  );
}

export default BarChart;