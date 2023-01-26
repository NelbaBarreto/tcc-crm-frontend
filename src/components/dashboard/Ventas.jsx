import React from "react";
import BarChart from "./assets/js/BarChart";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  getCasosPorEstado,
  getLeadsPorOrigen
} from "../../api/dashboard";

const MainDash = () => {
  const [estadoData, setEstadoData] = useState({ datasets: [] });
  const [leadOrigenData, setLeadOrigenData] = useState({ datasets: [] });

  const {
    data: casosPorEstado,
    casosEFetching
  } = useQuery(["casosPorEstado"], getCasosPorEstado);

  const {
    data: leadsPorOrigen,
    leadsOFetching
  } = useQuery(["leadsPorOrigen"], getLeadsPorOrigen);

  console.log(leadsPorOrigen)

  useEffect(() => {
    if (!casosEFetching) {
      setEstadoData({
        labels: casosPorEstado?.map((data) => data.estado),
        datasets: [{
          label: "Casos",
          data: casosPorEstado?.map((data) => data.total),
          backgroundColor: ["#3296ed", "#96d44e", "#c398f5", "#50d4cd"]
        },],
      });
    }
  }, [casosPorEstado, casosEFetching]);

  useEffect(() => {
    if (!leadsOFetching && leadsPorOrigen.length) {
      setLeadOrigenData(
        {
          labels: leadsPorOrigen[0]?.map((data) => data.origen),
          datasets: [{
            label: "Leads",
            data: leadsPorOrigen[0]?.map((data) => data.total),
            backgroundColor: ["#3296ed", "#96d44e", "#c398f5", "#50d4cd"]
          },],
        },
        {
          labels: leadsPorOrigen[1]?.map((data) => data.origen),
          datasets: [{
            label: "Leads Convertidos",
            data: leadsPorOrigen[1]?.map((data) => data.total),
            backgroundColor: ["#3e51b5", "#96d44e", "#c398f5", "#50d4cd"]
          },],
        });
    }
  }, [leadsPorOrigen, leadsOFetching]);

  return (
    <div
      className="grid sm:grid-rows-3 sm:grid-cols-1 md:grid-cols-3 md:grid-rows-1 gap-1"
    >
      <div className="rounded-md shadow-md bg-white p-2">
        <BarChart
          chartData={leadOrigenData}
          title="Leads y Leads Convertidos Por Origen"
        />
      </div>
    </div>
  )
}


export default MainDash;