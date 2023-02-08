import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { classNameNavItem } from "../../formulario/Componentes";
import classNames from "classnames";

const resolveLinkPath = (childTo, parentTo) => `${parentTo}/${childTo}`;

const NavItemHeader = (props) => {
  const { item } = props;
  const { label, Icon, to: headerToPath, children } = item;
  const location = useLocation();

  const className = classNameNavItem;
  const activeClassName = "p-2.5 mt-3 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:bg-purple-200 bg-purple-200 text-deep-purple-500 font-semibold hover:text-deep-purple-500";

  const [expanded, setExpand] = useState(
    location.pathname.includes(headerToPath)
  );

  const onExpandChange = e => {
    e.preventDefault();
    setExpand(expanded => !expanded);
  };

  return (
    <>
      <div
        className={classNameNavItem + " font-semibold"}
        onClick={onExpandChange}
      >
        <Icon />
        <div className="flex justify-between w-full items-center">
          <span className="text-[15px] ml-4">{label}</span>
          <span className="icon">
            <FontAwesomeIcon
              className={classNames("text-base", { "rotate-180": expanded })}
              icon={solid("caret-down")}
            />
          </span>
        </div>
      </div>
      {expanded && (
        <div className="text-left text-sm mt-2 w-4/5 mx-auto bg-purple-50 rounded-md">
          {children.map((item, index) => {
            const key = `${item.label}-${index}`;

            const { label, Icon } = item;

            return (
              <NavLink
                key={key}
                to={resolveLinkPath(item.to, props.item.to)}
                className={nav => (nav.isActive ? activeClassName : className)} 
              >
                <Icon />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
      
    </>
  );
};

export default NavItemHeader;