import React from "react";
import { useState, useEffect } from "react";
import DoughnutChart from "./Doughnut";
import { useQuery } from "react-query";
import {
  getCasosActivosPorPrioridad
} from "../../../../api/dashboard";

const MainDash = () => {
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
    <section className="section w-full m-auto">
      <div className="MainDash">
        <div className="columns">
          <div className="column is-half">
            <div className="box">
              <div style={{ width: 400, height: 400 }}>
                <DoughnutChart
                  chartData={prioridadData}
                  half={true}
                  title="Customer Satisfaction Score"
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