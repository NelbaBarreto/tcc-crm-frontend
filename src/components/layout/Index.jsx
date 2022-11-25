import React from "react";
import Sidebar from "../sidemenu/Sidebar";
import Header from "./Header";
import style from "./layout.module.css";

const Layout = props => {
  const { children } = props;

  return (
    <div className={style.layout}>
      <Header />
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