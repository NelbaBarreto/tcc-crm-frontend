import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'


function DoughnutChart({chartData}){
    return <Doughnut 
    data={chartData}
    options={{
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Llamadas por Estado"
            }
        }
    }}  />;
}

export default DoughnutChart;