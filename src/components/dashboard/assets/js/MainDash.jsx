import React from "react";
import Cards from '../Cards/Cards'
import '../css/MainDash.css'

const MainDash = () => {
    return(
        <div className="MainDash">
            <div className="titulo"><h1>Dashboard</h1></div>
            
            <Cards/>
        </div>
    )
}


export default MainDash;