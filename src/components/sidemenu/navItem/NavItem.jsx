import React from "react";
import { NavLink } from "react-router-dom";
import NavItemHeader from "./NavItemHeader.jsx";
import { classNameNavItem } from "../../formulario/Componentes.jsx";

const NavItem = ({ item }) => {
  const { label, Icon, to, children } = item;
  const className = classNameNavItem + " font-semibold";
  const activeClassName = "p-2.5 mt-3 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:bg-purple-200 bg-purple-200 text-deep-purple-500 font-semibold hover:text-deep-purple-500";

  if (children) {
    return <NavItemHeader item={item} />;
  }

  return (
    <NavLink
      to={to}
      className={nav => (nav.isActive ? activeClassName : className)}
    >
      <Icon />
      <span className="text-[15px] ml-4">{label}</span>
    </NavLink>
  );
};

export default NavItem;