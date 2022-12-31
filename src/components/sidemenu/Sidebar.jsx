import React from "react";
import NavItem from "./navItem/NavItem.jsx";
import { sideMenu } from "./menu.config.js";

const Sidebar = () => {
  return (
    <div
      className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white shadow-md"
    >
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <h1 className="font-bold text-gray-600 text-[15px] ml-3">CoursesCRM</h1>
        </div>
        <div className="my-2 bg-gray-300 h-[1px]"></div>
      </div>
      {sideMenu.map((item, index) => {
        return <NavItem key={`${item.label}-${index}`} item={item} />;
      })}
    </div>
  );
};

export default Sidebar;