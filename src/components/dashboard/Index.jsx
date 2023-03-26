import React from "react";
import Soporte from "./Soporte";
import CSAT from "./CSAT";
import Ventas from "./Ventas";
import Actividades from "./Actividades";
import Marketing from "./Marketing";
import Tabs from "../Tabs";

const tabList = [
  {
    name: "Ventas",
    content: <Ventas />
  },
  {
    name: "Marketing",
    content: <Marketing />
  },
  {
    name: "Soporte",
    content: <Soporte />
  },
  {
    name: "Actividades",
    content: <Actividades />
  },
  {
    name: "CSAT",
    content: <CSAT />
  }
];

const Index = () => {
  return (
    <Tabs 
      tabList={tabList} 
      titulo="Dashboard"
    />
  )
}

export default Index;