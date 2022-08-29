import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import classnames from "classnames";

const resolveLinkPath = (childTo, parentTo) => `${parentTo}/${childTo}`;

const NavItemHeader = props => {
  const { item } = props;
  const { label, Icon, to: headerToPath, children } = item;
  const location = useLocation();

  const [expanded, setExpand] = useState(
    location.pathname.includes(headerToPath)
  );

  const onExpandChange = e => {
    e.preventDefault();
    setExpand(expanded => !expanded);
  };

  return (
    <>
      <button
        className="flex items-center no-underline py-3 px-5 text-deep-purple-900 hover:bg-deep-purple-100
                   hover:text-deep-purple-900 w-full border-none bg-transparent cursor-pointer outline-none"
        onClick={onExpandChange}
      >
        <Icon />
        <span className="text-deep-purple-900 hover:text-deep-purple-900 text-base">{label}</span>
        <span className="icon">
          <FontAwesomeIcon 
            className={classnames("text-deep-purple-900 ml-auto w-3 h-3", { "rotate-180": expanded })} 
            icon={solid("chevron-down")} 
          />
        </span>
      </button>

      {expanded && (
        <div className="deep-purple-300">
          {children.map((item, index) => {
            const key = `${item.label}-${index}`;

            const { label, Icon, children } = item;

            if (children) {
              return (
                <div key={key}>
                  <NavItemHeader
                    item={{
                      ...item,
                      to: resolveLinkPath(item.to, props.item.to),
                    }}
                  />
                </div>
              );
            }

            return (
              <NavLink
                key={key}
                to={resolveLinkPath(item.to, props.item.to)}
                className="flex items-center no-underline py-3 px-5 text-deep-purple-900 hover:bg-deep-purple-100
                hover:text-deep-purple-900 w-full border-none bg-transparent cursor-pointer outline-none"
              >
                <Icon />
                <span className="text-deep-purple-700 hover:text-deep-purple-900 text-base">{label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NavItemHeader;