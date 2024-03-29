import React from "react";
import NavItem from "./navItem/NavItem.jsx";
import useToken from "../../utils/useToken";
import { classNameNavItem } from "../formulario/Componentes.jsx";
import { useNavigate } from "react-router-dom";
import { sideMenu, logout } from "./menu.config.js";

const Sidebar = () => {
  const { usuario = {} } = useToken();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div
      className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center 
        bg-white shadow-md scrollbar-styles"
    >
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <img src="/logo.png" className="m-auto" style={{ height: "50px" }} alt="" />
        </div>
      </div>
      <div className="my-2 bg-gray-300 h-[1px]"></div>
      <div className="inline-flex items-center justify-center">
        <div className="rounded-full text-lg bg-gray-200 w-10 h-10 mx-1 flex items-center justify-center font-semibold" >
          {usuario?.nom_usuario?.toUpperCase().slice(0, 2)}
        </div>
        <span>{usuario?.nom_usuario}</span>
      </div>
      <div className="my-2 bg-gray-300 h-[1px]"></div>
      {sideMenu.map((item, index) => {
        return <NavItem key={`${item.label}-${index}`} item={item} />;
      })}
      <div className="my-2 bg-gray-300 h-[1px]"></div>
      <div
        className={`${classNameNavItem} font-semibold`}
        onClick={() => cerrarSesion()}
      >
        <logout.Icon />
        <span className="text-[15px] ml-4">{logout.label}</span>
      </div>
    </div>
  );
};

export default Sidebar;