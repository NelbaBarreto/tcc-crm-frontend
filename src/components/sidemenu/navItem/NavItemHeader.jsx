import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import style from "./navItem.module.css";

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
        //className={`${style.navItem} ${style.navItemHeaderButton}`}
        className="flex items-center no-underline py-3 px-5 text-lila-500 hover:bg-lila-200
                   hover:text-lila-350 w-full border-none bg-transparent cursor-pointer outline-none"
        onClick={onExpandChange}
      >
        <Icon /*className={style.navIcon}*/ />
        <span className="text-lila-500 hover:text-lila-350 text-base">{label}</span>
        {/* <ChevronDownIcon
          className={`${style.navItemHeaderChevron} ${
            expanded && style.chevronExpanded
          }`}
        /> */}
        <span className="icon">
          <FontAwesomeIcon icon={solid("chevron-down")} />
        </span>
      </button>

      {expanded && (
        <div className={style.navChildrenBlock}>
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
                className={style.navItem}
                activeClassName={style.activeNavItem}
              >
                <Icon /*className={style.navIcon}*/ />
                <span className={style.navLabel}>{label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NavItemHeader;