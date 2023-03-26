import React from "react";
import { useState, useEffect } from "react";
import PieChart from "./assets/js/Piechart";
import DoughnutChart from "./assets/js/Doughnut";
import { useQuery } from "react-query";
import {
  getLlamadasPorEstado, getTareasActivasPorPrioridad, getTareasPorEstado
} from "../../api/dashboard";
import { Tableau20 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau";
import { Paired7 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

const Actividades = () => {
  const [llamadaEstadoData, setLlamadaEstadoData] = useState({ datasets: [] });
  const [tareaEstadoData, setTareaEstadoData] = useState({ datasets: [] });
  const [tareaPrioridadData, setTareaPrioridadData] = useState({ datasets: [] });

  const {
    data: llamadasPorEstado,
    llamadasEFetching
  } = useQuery(["llamadasPorEstado"], getLlamadasPorEstado);

  const {
    data: tareasPorEstado,
    tareasEFetching
  } = useQuery(["tareasPorEstado"], getTareasPorEstado);

  const {
    data: tareasPorPrioridad,
    tareasPFetching
  } = useQuery(["tareasPorPrioridad"], getTareasActivasPorPrioridad);

  useEffect(() => {
    if (!tareasPFetching) {
      setTareaPrioridadData({
        labels: tareasPorPrioridad?.map((data) => data.prioridad),
        datasets: [{
          label: "Tareas",
          data: tareasPorPrioridad?.map((data) => data.total),
          backgroundColor: [Paired7[2], Paired7[0], Paired7[4]]
        },],
      });
    }
  }, [tareasPorPrioridad, tareasPFetching]);

  useEffect(() => {
    if (!llamadasEFetching) {
      setLlamadaEstadoData({
        labels: llamadasPorEstado?.map((data) => data.estado),
        datasets: [{
          label: "Llamadas",
          data: llamadasPorEstado?.map((data) => data.total),
          backgroundColor: Tableau20
        },],
      });
    }
  }, [llamadasPorEstado, llamadasEFetching]);

  useEffect(() => {
    if (!tareasEFetching) {
      setTareaEstadoData({
        labels: tareasPorEstado?.map((data) => data.estado),
        datasets: [{
          label: "Tareas",
          data: tareasPorEstado?.map((data) => data.total),
          backgroundColor: Tableau20
        },],
      });
    }
  }, [tareasPorEstado, tareasEFetching]);

  return (
    <div
      className="grid sm:grid-rows-3 sm:grid-cols-1 md:grid-cols-3 md:grid-rows-1 gap-1"
    >
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Llamadas Por Estado
        </p>
        <PieChart
          chartData={llamadaEstadoData}
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Tareas Por Estado
        </p>
        <PieChart
          chartData={tareaEstadoData}
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2">
        <p className="text-sm text-center font-semibold mt-2">
          Tareas Activas por Prioridad
        </p>
        <DoughnutChart
          chartData={tareaPrioridadData}
        />
      </div>
    </div>
  )
}

export default Actividades;