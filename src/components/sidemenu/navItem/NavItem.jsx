import React from "react";
import { NavLink } from "react-router-dom";
import NavItemHeader from "./NavItemHeader.jsx";


const NavItem = ({ item }) => {
  const { label, Icon, to, children } = item;
  const className = "p-2.5 mt-3 flex items-center rounded-md px-5 duration-300 cursor-pointer bg-white hover:bg-purple-200  text-deep-purple-900 hover:text-deep-purple-900";
  const activeClassName = "p-2.5 mt-3 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:bg-purple-200 bg-purple-200 text-deep-purple-900 hover:text-white hover:text-deep-purple-900";

  if (children) {
    return <NavItemHeader item={item} />;
  }

  return (
    <>
      <NavLink
        to={to}
        className={nav => (nav.isActive ? activeClassName : className)}
      >
        <Icon />
        <span className="text-[15px] ml-4 font-bold">{label}</span>
      </NavLink>
    </>
  );
};

export default NavItem;