import React from "react";

const Sidemenu = () => {

  const data = [
    { menu: "Dashboard", icon: "", link: "/dashboard" },
    { menu: "Ventas", submenu: [{ menu: "Organizaciones", link: "/organizaciones" },], icon: "" }
  ];

  return (
    <aside className="menu">
      <ul className="menu-list">
        <li><a>Dashboard</a></li>
        <li><a>Ventas</a></li>
        <li><a>Marketing</a></li>
        <li><a>Soporte</a></li>
        <li><a>Casos</a></li>
        <li><a>Actividades</a></li>
        <li><a>Reportes</a></li>
      </ul>
    </aside>
  )
};

export default Sidemenu;