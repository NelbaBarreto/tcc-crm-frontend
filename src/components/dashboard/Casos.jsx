import React from "react";
import { useState, useEffect } from "react";
import PieChart from "./assets/js/Piechart";
import DoughnutChart from "./assets/js/Doughnut";
import { useQuery } from "react-query";
import {
  getCasosPorEstado, getCasosActivosPorPrioridad, getCasosPorTipo, getCasosPorOrigen
} from "../../api/dashboard";

const Casos = () => {
  const [estadoData, setEstadoData] = useState({ datasets: [] });
  const [prioridadData, setPrioridadData] = useState({ datasets: [] });
  const [tipoData, setTipoData] = useState({ datasets: [] });
  const [origenData, setOrigenData] = useState({ datasets: [] });

  const {
    data: casosPorEstado,
    casosEFetching
  } = useQuery(["casosPorEstado"], getCasosPorEstado);

  const {
    data: casosPorPrioridad,
    casosPFetching
  } = useQuery(["casosPorPrioridad"], getCasosActivosPorPrioridad);

  const {
    data: casosPorTipo,
    casosTFetching
  } = useQuery(["casosPorTipo"], getCasosPorTipo);

  const {
    data: casosPorOrigen,
    casosOFetching
  } = useQuery(["casosPorOrigen"], getCasosPorOrigen);

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
    if (!casosPFetching) {
      setPrioridadData({
        labels: casosPorPrioridad?.map((data) => data.prioridad),
        datasets: [{
          label: "Casos",
          data: casosPorPrioridad?.map((data) => data.total),
          backgroundColor: ["#ff562f", "#ffab00", "#35b47f"]
        },],
      });
    }
  }, [casosPorPrioridad, casosPFetching]);

  useEffect(() => {
    if (!casosTFetching) {
      setTipoData({
        labels: casosPorTipo?.map((data) => data.tipo),
        datasets: [{
          label: "Casos",
          data: casosPorTipo?.map((data) => data.total),
          backgroundColor: ["#16bfdb", "#5969ff", "#f0346e", "#209CEE"]
        },],
      });
    }
  }, [casosPorTipo, casosTFetching]);

  useEffect(() => {
    if (!casosOFetching) {
      setOrigenData({
        labels: casosPorOrigen?.map((data) => data.origen),
        datasets: [{
          label: "Casos",
          data: casosPorOrigen?.map((data) => data.total),
          backgroundColor: ["#bd0000", "#3e51b5", "#4caf4f", "#07a9f3", "#f9ce1d"]
        },],
      });
    }
  }, [casosPorOrigen, casosOFetching]);

  return (
    <div
      className="grid sm:grid-rows-3 sm:grid-cols-1 md:grid-cols-3 md:grid-rows-1 gap-1"
    >
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Casos Por Estado
        </p>
        <PieChart
          chartData={estadoData}
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Casos Activos Por Prioridad
        </p>
        <DoughnutChart
          chartData={prioridadData}
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Casos Por Tipo
        </p>
        <PieChart
          chartData={tipoData}
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Casos Por Origen
        </p>
        <DoughnutChart
          chartData={origenData}
        />
      </div>
    </div>
  )
}

export default Casos;