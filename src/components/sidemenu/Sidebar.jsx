import React from "react";
import NavItem from "./navItem/NavItem.jsx";
import useToken from "../../utils/useToken";
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
      className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white shadow-md"
    >
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <img src="/logo.png" className="m-auto" style={{ height: "25px" }} alt="" />
        </div>
        <div className="my-2 bg-gray-300 h-[1px]"></div>
      </div>
      <span>{usuario?.nom_usuario}</span>
      <div className="my-2 bg-gray-300 h-[1px]"></div>
      {sideMenu.map((item, index) => {
        return <NavItem key={`${item.label}-${index}`} item={item} />;
      })}
      <div className="my-2 bg-gray-300 h-[1px]"></div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-5 duration-300 cursor-pointer bg-white hover:bg-purple-200  text-deep-purple-900 hover:text-deep-purple-900"
        onClick={() => cerrarSesion()}
      >
        <logout.Icon />
        <span className="text-[15px] ml-4 font-bold">{logout.label}</span>
      </div>
    </div>
  );
};

export default Sidebar;