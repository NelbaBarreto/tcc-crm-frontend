import React from "react";
import { Pie } from "react-chartjs-2";

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
					}
				}
			}} 
		/>
	);
}

export default PieAreaChart;