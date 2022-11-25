import React from "react";
import useToken from "../../utils/useToken";
import style from "./layout.module.css";
import { classNameButton1 } from "../formulario/Componentes";

const Header = () => {
  const { usuario = {} } = useToken();
  return (
    <nav className={`navbar ${style.header}`}>
      <div className="navbar-menu">
        <div className="navbar-end">
          <span className="navbar-item">
            {usuario?.nom_usuario}
          </span>
          <div className="navbar-item">
            <button className={classNameButton1}>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;