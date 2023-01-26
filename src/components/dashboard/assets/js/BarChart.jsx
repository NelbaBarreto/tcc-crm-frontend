import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

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