import React from "react";
import { useState, useEffect } from "react";
import DoughnutChart from "./assets/js/Doughnut";
import { useQuery } from "react-query";
import {
  getCsat, getRespuestasPorValor
} from "../../api/dashboard";

const CSAT = () => {
  const [prioridadData, setPrioridadData] = useState({ datasets: [] });
  const [csatData, setCsatData] = useState();

  const {
    data: respuestasPorValor,
    respuestasVFetching
  } = useQuery(["respuestasPorValor"], getRespuestasPorValor);

  const {
    data: csat,
    csatPFetching
  } = useQuery(["csat"], getCsat);

  useEffect(() => {
    if (!respuestasVFetching) {
      setPrioridadData({
        labels: respuestasPorValor?.map((data) => data.etiqueta),
        datasets: [{
          label: "Respuestas",
          data: respuestasPorValor?.map((data) => data.total),
          backgroundColor: ["#ff562f", "#ffab00", "#35b47f"]
        },],
      });
    }
  }, [respuestasPorValor, respuestasVFetching]);

  useEffect(() => {
    if (!csatPFetching) {
      setCsatData(csat?.length ? csat[0] : "");
    }
  }, [csat, csatPFetching]);

  return (
    <div
      className="grid grid-cols-2 gap-1"
    >
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">Encuesta de Satisfacción</p>
        <DoughnutChart
          chartData={prioridadData}
          half={true}
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2 grid grid-rows-2 gap-1">
        <p className="text-sm text-center font-semibold mt-2">Customer Satisfaction Score (CSAT)</p>
        <p className="text-6xl text-center">
          {csatData ? `${Math.round(csatData.csat, 2)}%` : "Sin datos"}
        </p>
      </div>
    </div>
  )
}


export default CSAT;