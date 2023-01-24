import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

const DoughnutChart = ({ chartData, title }) => {
  return (
    <Doughnut
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

export default DoughnutChart;