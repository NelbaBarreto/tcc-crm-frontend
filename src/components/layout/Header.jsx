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
          {/* <span className="navbar-item">
            {usuario?.nom_usuario}
          </span>
          <div className="navbar-item">
            <button className={classNameButton1}>
              <span>Cerrar Sesión</span>
            </button>
          </div> */}
          <div className="navbar-item has-dropdown has-dropdown-with-icons has-divider is-hoverable">
            <div className="navbar-link is-arrowless w-36">
              <div className="is-user-name"><span>{usuario?.nom_usuario}</span></div>
              {/* <span className="icon"><i className="mdi mdi-chevron-down"></i></span> */}
            </div>
            <div className="navbar-dropdown">
              <a href="profile.html" className="navbar-item">
                {/* <span className="icon"><i className="mdi mdi-account"></i></span> */}
                <span>Mi Perfil</span>
              </a>
              <a className="navbar-item">
                {/* <span className="icon"><i className="mdi mdi-settings"></i></span> */}
                <span>Configuraciones</span>
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item">
                {/* <span className="icon"><i className="mdi mdi-logout"></i></span> */}
                <span>Cerrar Sesión</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;