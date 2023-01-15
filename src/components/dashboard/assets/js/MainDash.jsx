import React from "react";
import Cards from "../Cards/Cards"
import { useState, useEffect } from "react";
import BarChart from "./BarChart"
import LineChart from "./LineChart";
import PieChart from "./Piechart";
import PolarChart from "./PolarChart";
import { UserData } from '../../Data'
import { useQuery } from "react-query";
import { getCasosPorEstado } from "../../../../api/dashboard";
import { Titulo1 } from "../../../formulario/Titulo";
import "../css/MainDash.css"

const MainDash = () => {
  const [userData, setUserData] = useState({ datasets: [] });

  const {
    data: casosPorEstado,
    isFetching
  } = useQuery(["casosPorEstado"], getCasosPorEstado);

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

  return (
    <section className="section w-full m-auto">
      <Titulo1>
        Dashboard
      </Titulo1>
      <div className="MainDash">
        {/* <div>
          <Cards />
        </div> */}
        {/* <div className="columns">
          <div className="column">
            <br />
            <div className="box">
              <div style={{ width: 450 }}>
                <BarChart chartData={userData} />
              </div>
            </div>
          </div> */}
        {/* <div className="column">
            <br />
            <div className="box">
              <div style={{ width: 450 }}>
                <LineChart chartData={userData} />
              </div>
            </div>
          </div> */}
        {/* </div> */}
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
          {/* <div className="column">
            <br />
            <div className="box">
              <div style={{ width: 400 }}>
                <PolarChart chartData={casosPo} />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}


export default MainDash;