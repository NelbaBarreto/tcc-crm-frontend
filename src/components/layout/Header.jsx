import React from "react";
import useToken from "../../utils/useToken";
import style from "./layout.module.css";

const Header = () => {
  const { usuario = {} } = useToken();
  return (
    <header  className={style.header}>
      {usuario?.nom_usuario}
    </header>
  )
}

export default Header;