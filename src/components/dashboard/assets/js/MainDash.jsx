import React from "react";
import Cards from "../Cards/Cards"
import { Titulo1 } from "../../../formulario/Titulo";
import "../css/MainDash.css"

const MainDash = () => {
  return (
    <section className="section w-full m-auto">
      <Titulo1>
        Dashboard
      </Titulo1>
      <div className="MainDash">
        <Cards />
      </div>
    </section>
  )
}


export default MainDash;