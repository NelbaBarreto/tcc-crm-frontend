import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'


function BarChart({chartData}){
    return <Bar 
    data={chartData}
    options={{
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Leads por Estado"
            }
        }
    }}  />;
}

export default BarChart;