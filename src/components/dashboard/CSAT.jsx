import React from "react";
import { useState, useEffect } from "react";
import DoughnutChart from "./assets/js/Doughnut";
import { useQuery } from "react-query";
import {
  getCasosActivosPorPrioridad
} from "../../api/dashboard";

const CSAT = () => {
  const [prioridadData, setPrioridadData] = useState({ datasets: [] });

  const {
    data: casosPorPrioridad,
    casosPFetching
  } = useQuery(["casosPorPrioridad"], getCasosActivosPorPrioridad);

  useEffect(() => {
    if (!casosPFetching) {
      setPrioridadData({
        labels: casosPorPrioridad?.map((data) => data.prioridad),
        datasets: [{
          label: "Cantidad de Casos",
          data: casosPorPrioridad?.map((data) => data.total),
          backgroundColor: ["#ff562f", "#ffab00", "#35b47f"]
        },],
      });
    }
  }, [casosPorPrioridad, casosPFetching]);

  return (
    <div
      className="grid grid-cols-2"
    >
      <div className="rounded-md shadow-md bg-white p-2">
        <DoughnutChart
          chartData={prioridadData}
          half={true}
          title="Customer Satisfaction Score"
        />
      </div>
    </div>
  )
}


export default CSAT;