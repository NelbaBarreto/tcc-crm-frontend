import React from "react";
import NavItem from "./navItem/NavItem.jsx";
import { sideMenu } from "./menu.config.js";

const Sidebar = () => {
  return (
    <aside className="min-h-full h-full shadow-lg">
      <nav>
        {sideMenu.map((item, index) => {
          return <NavItem key={`${item.label}-${index}`} item={item} />;
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;