import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { autenticarUsuarios } from "../../api/usuarios";

const MostrarError = ({ error }) => {
  return (
    <div className="notification is-danger is-light">
      {error}
    </div>
  );
};

const Login = ({ setToken }) => {
  const [usuario, setUsuario] = useState({});
  const [error, setError] = useState("");

  const login = async e => {
    e.preventDefault();
    let userToken;
    try {
      userToken = await autenticarUsuarios(usuario);
      if (userToken.token) {
        setToken(userToken);
        setError("");
      } else {
        setError(userToken.error);
      }
    } catch {
      setError("Ocurrió un error al intentar iniciar sesión");
    }
  };

  return (
    <div className="hero is-fullheight bg-lila-400">
      <section className="section sm:w-1/2 w-full m-auto hero shadow-lg shadow-gray-800 bg-white">
        <h1 className="title is-3 text-center">Lorem Ipsum CRM</h1>
        {error ? <MostrarError error={error} /> : null}
        <div className="field mt-3">
          <div className="control">
            <button
              className="button is-medium font-semibold w-full shadow-lg hover:bg-gray-200"
              style={{ borderColor: "#1E40AF", color: "#130b43" }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={brands("google")} />
              </span>
              <span>Iniciar Sesión con Google</span>
            </button>
          </div>
        </div>
        <div className="divider">O</div>
        <form>
          <div className="field">
            <label className="label">Usuario</label>
            <div className="control">
              <input
                name="nom_usuario"
                value={usuario.nom_usuario || ""}
                className="input is-medium shadow-lg"
                type="text"
                onChange={e => setUsuario({ ...usuario, [e.target.name]: e.target.value })}
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input
                name="password"
                value={usuario.password || ""}
                className="input is-medium shadow-lg"
                type="password"
                placeholder="Ingresa tu contraseña"
                onChange={e => setUsuario({ ...usuario, [e.target.name]: e.target.value })}
              />
            </div>
          </div>
          <a href="/" className="font-bold has-text-link text">¿Olvidaste tu contraseña?</a>

          <div className="field mt-3">
            <div className="control">
              <button
                className="button is-medium font-semibold w-full shadow-lg text-white hover:text-white hover:bg-lila-700 bg-lila-400 border-lila-700"
                onClick={login}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;