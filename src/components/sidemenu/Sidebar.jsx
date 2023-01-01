import React from "react";
import NavItem from "./navItem/NavItem.jsx";
import useToken from "../../utils/useToken";
import { sideMenu, logout } from "./menu.config.js";

const Sidebar = () => {
  const { usuario = {} } = useToken();

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
      <NavItem item={logout} />
    </div>
  );
};

export default Sidebar;