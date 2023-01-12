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
  const [userData, setUserData] = useState({});

  const {
    data: casosPorEstado,
    isFetching
  } = useQuery(["casosPorEstado"], getCasosPorEstado);

  useEffect(() => {
    if (!isFetching) {
      setUserData({
        labels: casosPorEstado.map((data) => data?.estado),
        datasets: [{
          label: "Casos por Estado",
          data: casosPorEstado.map((data) => data?.total),
          // backgroundColor: ["purple", "orange"],
          // borderColor: "black",
          // borderWidth: 2,
        },]
    
      });
    }
}, [isFetching]);

// console.log(casosPorEstado);

  return (
    <section className="section w-full m-auto">
      <Titulo1>
        Dashboard
      </Titulo1>
      <div className="MainDash">
        <div>
          <Cards />
        </div>
        {/* <div class="columns">
          <div class="column">
            <br />
            <div class="box">
              <div style={{ width: 450 }}>
                <BarChart chartData={userData} />
              </div>
            </div>
          </div> */}
          {/* <div class="column">
            <br />
            <div class="box">
              <div style={{ width: 450 }}>
                <LineChart chartData={userData} />
              </div>
            </div>
          </div> */}
        {/* </div> */}
        <div class="columns">
          <div class="column">
            <br />
            <div class="box">
              <div style={{ width: 400 }}>
                <PieChart chartData={casosPorEstado} />
              </div>
            </div>
          </div>
          {/* <div class="column">
            <br />
            <div class="box">
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