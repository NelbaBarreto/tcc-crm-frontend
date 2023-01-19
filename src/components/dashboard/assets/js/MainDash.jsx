import React from "react";
import Cards from "../Cards/Cards"
import { useState, useEffect } from "react";
import BarChart from "./BarChart"
import LineChart from "./LineChart";
import PieChart from "./Piechart";
import DoughnutChart from "./Doughnut";
import PolarChart from "./PolarChart";
import { useQuery } from "react-query";
import { getCasosPorEstado, getLeadsPorEstado, getLlamadasPorEstado, getCasosPorPrioridad } from "../../../../api/dashboard";
import { Titulo1 } from "../../../formulario/Titulo";
import "../css/MainDash.css"

const MainDash = () => {
  const [userData, setUserData] = useState({ datasets: [] });
  const [leadData, setleadData] = useState({ datasets: [] });
  const [llamadaData, setllamadaData] = useState({ datasets: [] });
  const [casosPData, setcasosPData] = useState({ datasets: [] });

  const {
    data: casosPorEstado,
    isFetching
  } = useQuery(["casosPorEstado"], getCasosPorEstado);

  const {
    data: leadsPorEstado,
    leadFetching
  } = useQuery(["leadsPorEstado"], getLeadsPorEstado);

  const {
    data: llamadasPorEstado,
    llamadaFetching
  } = useQuery(["llamadasPorEstado"], getLlamadasPorEstado);

  const {
    data: casosPorPrioridad,
    casosPFetching
  } = useQuery(["casosPorPrioridad"], getCasosPorPrioridad);

  useEffect(() => {
    if (!isFetching) {
      setUserData({
        labels: casosPorEstado?.map((data) => data.estado),
        datasets: [{
          label: "Cantidad de Casos",
          data: casosPorEstado?.map((data) => data.total),
        },],
      });
    }
  }, [casosPorEstado, isFetching]);

  useEffect(() => {
    if (!leadFetching) {
      setleadData({
        labels: leadsPorEstado?.map((data) => data.estado),
        datasets: [{
          label: "Cantidad de Leads",
          data: leadsPorEstado?.map((data) => data.total),
          backgroundColor: ["blue"]
        },],
      });
    }
  }, [leadsPorEstado, leadFetching]);

  useEffect(() => {
    if (!llamadaFetching) {
      setllamadaData({
        labels: llamadasPorEstado?.map((data) => data.estado),
        datasets: [{
          label: "Llamadas por Estado",
          data: llamadasPorEstado?.map((data) => data.total),
          backgroundColor: ["blue", "Yellow", "Green", "red", "orange"]
        },],
      });
    }
  }, [llamadasPorEstado, llamadaFetching]);

  useEffect(() => {
    if (!casosPFetching) {
      setcasosPData({
        labels: casosPorPrioridad?.map((data) => data.prioridad),
        datasets: [{
          label: "Casos por Prioridad",
          data: casosPorPrioridad?.map((data) => data.total),
          backgroundColor: ["#FFE4C4", "#C3B091","#CCCCFF"]
        },],
      });
    }
  }, [casosPorPrioridad, casosPFetching]);

  return (
    <section className="section w-full m-auto">
      <Titulo1>
        Dashboard
      </Titulo1>
      <div className="MainDash">

        <div className="columns">
          <div className="column">
            <br />
            <div className="box">
              <div style={{ width: 400 }}>
                <PieChart
                  chartData={userData}
                  title="Casos Por Estado"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <br />
            <div className="box">
              <div style={{ width: 400, height: 400 }}>
                <DoughnutChart
                  chartData={llamadaData}
                />
              </div>
            </div>
          </div>

        </div>
        <div className="columns">
          <div className="column">
            <br />
            <div className="box">
              <div style={{ width: 400}}>
                <BarChart
                  chartData={leadData}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <br />
            <div className="box">
              <div style={{ width: 400}}>
                <PieChart
                  chartData={casosPData}
                  title="Casos por proridad"
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