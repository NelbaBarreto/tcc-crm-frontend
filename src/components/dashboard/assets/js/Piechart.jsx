import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

const PieAreaChart = ({ chartData, title }) => {
	return (
		<Pie
			data={chartData}
			options={{
				plugins: {
					legend: {
						position: "top",
					},
					title: {
						display: true,
						text: title
					},
				}
			}}
		/>
	);
}

export default PieAreaChart;