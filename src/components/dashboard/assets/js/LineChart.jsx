/* eslint-disable no-unused-vars */
import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

function LineChart({chartData}){
    return <PolarArea 
    data={chartData}
    options={{
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Casos por prioridad" 
            }
        }
    }} />;
}

export default LineChart;