import React from "react";
import BarChart from "./assets/js/BarChart";
import DoughnutChart from "./assets/js/Doughnut";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  getLeadsPorEstado,
  getLeadsPorOrigen,
  getOportunidadesGanadasPorCurso
} from "../../api/dashboard";

const Ventas = () => {
  const [leadEstadoData, setLeadEstadoData] = useState({ datasets: [] });
  const [leadOrigenData, setLeadOrigenData] = useState({ datasets: [] });
  const [oportunidadGanadaData, setOportunidadGanadaData] = useState({ datasets: [] });

  const {
    data: leadsPorEstado,
    leadsEFetching
  } = useQuery(["leadsPorEstado"], getLeadsPorEstado);

  const {
    data: leadsPorOrigen,
    leadsOFetching
  } = useQuery(["leadsPorOrigen"], getLeadsPorOrigen);

  const {
    data: oportunidadPorCurso,
    oportunidadesCFetching
  } = useQuery(["oportunidadPorCurso"], getOportunidadesGanadasPorCurso);


  useEffect(() => {
    if (!leadsEFetching) {
      setLeadEstadoData({
        labels: leadsPorEstado?.map((data) => data.estado),
        datasets: [{
          label: "Leads",
          data: leadsPorEstado?.map((data) => data.total),
          backgroundColor: ["#3296ed", "#96d44e", "#c398f5", "#50d4cd"]
        },],
      });
    }
  }, [leadsPorEstado, leadsEFetching]);

  useEffect(() => {
    if (!oportunidadesCFetching) {
      setOportunidadGanadaData({
        labels: oportunidadPorCurso?.map((data) => data?.curso),
        datasets: [{
          label: "Cursos",
          data: oportunidadPorCurso?.map((data) => data?.total),
          backgroundColor: ["#16bfdb", "#5969ff", "#f0346e", "#209CEE"]
        },],
      });
    }
  }, [oportunidadPorCurso, oportunidadesCFetching]);

  useEffect(() => {
    if (!leadsOFetching && leadsPorOrigen?.length) {
      setLeadOrigenData(
        {
          labels: leadsPorOrigen[0]?.map((data) => data.origen),
          datasets: [
            {
              label: "Leads No Convertidos",
              data: leadsPorOrigen[0]?.map((data) => data.total),
              backgroundColor: ["#00bfc4"]
            },
            {
              label: "Leads Convertidos",
              data: leadsPorOrigen[1]?.map((data) => data.total),
              backgroundColor: ["#c77cff"]
            }
          ],
        }
      )
    }
  }, [leadsPorOrigen, leadsOFetching]);

  return (
    <div
      className="grid grid-cols-2 gap-1"
    >
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Leads Convertidos vs No Convertidos Por Origen
        </p>
        <BarChart
          chartData={leadOrigenData}
          stacked={true}
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Leads Por Estado
        </p>
        <BarChart
          chartData={leadEstadoData}
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Oportunidades Ganadas Por Curso
        </p>
        <DoughnutChart
          chartData={oportunidadGanadaData}
        />
      </div>
    </div>
  )
}


export default Ventas;