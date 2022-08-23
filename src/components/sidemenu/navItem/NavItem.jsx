import React from "react";
import { NavLink } from "react-router-dom";
import NavItemHeader from "./NavItemHeader.jsx";

const NavItem = ({ item }) => {
  const { label, Icon, to, children } = item;

  if (children) {
    return <NavItemHeader item={item} />;
  }

  return (
    <NavLink
      //exact
      to={to}
      className="flex items-center no-underline py-3 px-5 text-lila-500 hover:bg-lila-200 hover:text-lila-350"
      //activeClassName={style.activeNavItem}
    >
      <Icon />
      <span className="text-lila-500 hover:text-lila-350 text-base">{label}</span>
    </NavLink>
  );
};

export default NavItem;