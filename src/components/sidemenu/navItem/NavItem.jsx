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
      to={to}
      className="flex items-center no-underline py-3 px-5 text-deep-purple-900 hover:text-deep-purple-900 hover:bg-deep-purple-100"
    >
      <Icon />
      <span className="text-deep-purple-900 hover:text-deep-purple-900 text-base">{label}</span>
    </NavLink>
  );
};

export default NavItem;