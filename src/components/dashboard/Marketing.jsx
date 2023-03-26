import React from "react";
import { useState, useEffect } from "react";
import PieChart from "./assets/js/Piechart";
import { useQuery } from "react-query";
import {
  getLeadsPorCampana, getOportunidadesPorCampana
} from "../../api/dashboard";
import { Tableau20 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau";

const Marketing = () => {
  const [leadsData, setLeadsData] = useState({ datasets: [] });
  const [oportunidadesData, setOportunidadesData] = useState({ datasets: [] });

  const {
    data: leadsPorCampana,
    leadsCFetching
  } = useQuery(["leadsPorCampana"], getLeadsPorCampana);

  const {
    data: oportunidadesPorCampana,
    oportunidadesCFetching
  } = useQuery(["oportunidadesPorCampana"], getOportunidadesPorCampana);  

  useEffect(() => {
    if (!leadsCFetching) {
      setLeadsData({
        labels: leadsPorCampana?.map((data) => data.campana?.nombre),
        datasets: [{
          label: "Leads",
          data: leadsPorCampana?.map((data) => data.total),
          backgroundColor: Tableau20
        },],
      });
    }
  }, [leadsPorCampana, leadsCFetching]);

  useEffect(() => {
    if (!oportunidadesCFetching) {
      setOportunidadesData({
        labels: oportunidadesPorCampana?.map((data) => data.campana?.nombre),
        datasets: [{
          label: "Oportunidades",
          data: oportunidadesPorCampana?.map((data) => data.total),
          backgroundColor: Tableau20
        },],
      });
    }
  }, [oportunidadesPorCampana, oportunidadesCFetching]);

  return (
    <div
      className="grid md:grid-cols-2 sm:grid-cols-1 gap-1"
    >
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Cantidad de Leads por Campaña
        </p>
        <PieChart
          chartData={leadsData}
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Cantidad de Oportunidades por Campaña
        </p>
        <PieChart
          chartData={oportunidadesData}
        />
      </div>
    </div>
  )
}

export default Marketing;