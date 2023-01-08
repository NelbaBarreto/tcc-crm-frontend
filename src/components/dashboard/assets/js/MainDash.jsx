import React from "react";
import Cards from "../Cards/Cards"
import { useState } from "react";
import BarChart from "./BarChart"
import LineChart from "./LineChart";
import PieChart from "./Piechart";
import PolarChart from "./PolarChart";
import { UserData } from '../../Data'
import { Titulo1 } from "../../../formulario/Titulo";
import "../css/MainDash.css"

const MainDash = () => {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.anho),
    datasets: [{
      label: "Lead Ganados",
      data: UserData.map((data) => data.LeadGanados),
      backgroundColor: ["purple", "orange"],
      borderColor: "black",
      borderWidth: 2,
    },]

  });

  return (
    <section className="section w-full m-auto">
      <Titulo1>
        Dashboard
      </Titulo1>
      <div className="MainDash">
        <div>
          <Cards />
        </div>
        <div class="columns">
          <div class="column">
            <br />
            <div class="box">
              <div style={{ width: 450 }}>
                <BarChart chartData={userData} />
              </div>
            </div>
          </div>
          <div class="column">
            <br />
            <div class="box">
              <div style={{ width: 450 }}>
                <LineChart chartData={userData} />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <br />
            <div class="box">
              <div style={{ width: 400 }}>
                <PieChart chartData={userData} />
              </div>
            </div>
          </div>
          <div class="column">
            <br />
            <div class="box">
              <div style={{ width: 400 }}>
                <PolarChart chartData={userData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default MainDash;