import React from "react";
import Casos from "./Casos";
import CSAT from "./CSAT";
import Ventas from "./Ventas";
import Actividades from "./Actividades";
import Tabs from "../Tabs";

const tabList = [
  {
    name: "Ventas",
    content: <Ventas />
  },
  {
    name: "Soporte",
    content: <Casos />
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
    <Tabs tabList={tabList} />
  )
}

export default Index;