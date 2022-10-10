import React from "react";
import { NavLink } from "react-router-dom";
import NavItemHeader from "./NavItemHeader.jsx";

const NavItem = ({ item }) => {
  const { label, Icon, to, children } = item;
  const className = "flex items-center no-underline py-3 px-5 text-deep-purple-900 hover:bg-deep-purple-100 hover:text-deep-purple-900 w-full border-none bg-transparent cursor-pointer outline-none";
  const activeClassName = "flex items-center no-underline py-3 px-5 text-deep-purple-900 hover:text-deep-purple-900 w-full border-none bg-deep-purple-100 cursor-pointer outline-none";

  if (children) {
    return <NavItemHeader item={item} />;
  }

  return (
    <NavLink
      to={to}
      className={nav => (nav.isActive ? activeClassName : className)} 
    >
      <Icon />
      <span className="text-deep-purple-900 hover:text-deep-purple-900 text-base">{label}</span>
    </NavLink>
  );
};

export default NavItem;