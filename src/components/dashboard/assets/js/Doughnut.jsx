/* eslint-disable no-unused-vars */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

const DoughnutChart = ({ chartData, title, half }) => {
  const halfDoughnutConfig = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title
      },
    },
    circumference: 180,
    aspectRatio: 2,
    rotation: 270,
  };

  const doughnutConfig = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title
      },
    },
  };

  return (
    <Doughnut
      data={chartData}
      options={half ? halfDoughnutConfig : doughnutConfig} />
  );
}

export default DoughnutChart;