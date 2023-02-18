import React from "react";
import { Bar } from "react-chartjs-2";
import { Aspect6 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office";
import { Chart as ChartJS } from "chart.js/auto"

const BarChart = ({ chartData, title, stacked = false, legend = false }) => {
  return (
    <Bar
      data={chartData}
      options={{
        plugins: {
          legend: {
            display: legend,
            position: "top",
          },
          title: {
            display: true,
            text: title
          },
          colorschemes: {
            scheme: Aspect6
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: stacked,
          },
          y: {
            stacked: stacked,
            ticks: {
              precision: 0,
            },
          }
        },
      }}
    />
  );
}

export default BarChart;