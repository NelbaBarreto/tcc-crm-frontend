import React from "react";
import Sidebar from "../sidemenu/Sidebar";
import style from "./layout.module.css";

const Layout = props => {
  const { children } = props;

  return (
    <div className={style.layout}>
      <aside className={style.aside}>
        <Sidebar />
      </aside>
      <main className={style.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;