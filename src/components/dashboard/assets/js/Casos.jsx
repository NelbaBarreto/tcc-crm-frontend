import React from "react";
import { useState, useEffect } from "react";
import PieChart from "./Piechart";
import DoughnutChart from "./Doughnut";
import { useQuery } from "react-query";
import {
  getCasosPorEstado, getCasosActivosPorPrioridad, getCasosPorTipo, getCasosPorOrigen
} from "../../../../api/dashboard";
import { Titulo1 } from "../../../formulario/Titulo";

const MainDash = () => {
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
          label: "Cantidad de Casos",
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
          label: "Cantidad de Casos",
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
          label: "Cantidad de Casos",
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
          label: "Cantidad de Casos",
          data: casosPorOrigen?.map((data) => data.total),
          backgroundColor: ["#bd0000", "#3e51b5", "#4caf4f", "#07a9f3", "#f9ce1d"]
        },],
      });
    }
  }, [casosPorOrigen, casosOFetching]);

  return (
    <section className="section w-full m-auto">
      <Titulo1>
        Dashboard
      </Titulo1>
      <div className="MainDash">

        <div className="columns">
          <div className="column">
            <div className="box">
              <div style={{ width: 400 }}>
                <PieChart
                  chartData={estadoData}
                  title="Casos Por Estado"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="box">
              <div style={{ width: 400, height: 400 }}>
                <DoughnutChart
                  chartData={prioridadData}
                  title="Casos Activos Por Prioridad"
                />
              </div>
            </div>
          </div>

        </div>
        <div className="columns">
          <div className="column">
            <div className="box">
              <div style={{ width: 400 }}>
                <PieChart
                  chartData={tipoData}
                  title="Casos Por Tipo"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="box">
              <div style={{ width: 400 }}>
                <DoughnutChart
                  chartData={origenData}
                  title="Casos Por Origen"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default MainDash;