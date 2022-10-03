import React, { useState, useEffect, useReducer } from "react";
import MostrarMensaje from "../formulario/MostrarMensaje";
import { GoogleLogin } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reducer } from "../formulario/reducerFormularios.js";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { autenticarUsuarios } from "../../api/usuarios";
import { gapi } from "gapi-script";

const Login = ({ setToken }) => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const [state, dispatch] = useReducer(reducer, {});
  const [usuario, setUsuario] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "profile email"
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const login = async e => {
    e.preventDefault();
    let userToken;
    try {
      userToken = await autenticarUsuarios(usuario);
      if (userToken.token) {
        setToken(userToken);
        setError("");
      } else {
        setError(userToken?.data?.error);
      }
    } catch {
      setError("Ocurrió un error al intentar iniciar sesión");
    }
  };

  const loginGoogle = async response => {
    let userToken;
    try {
      userToken = await autenticarUsuarios({ email: response.profileObj.email });
      if (userToken.token) {
        setToken(userToken);
        setError("");
      } else {
        setError(userToken.error);
      }
    } catch {
      setError("Ocurrió un error al intentar iniciar sesión");
    }
  }

  return (
    <div className="hero is-fullheight bg-deep-purple-400">
      <section className="section sm:w-1/2 w-full m-auto hero shadow-lg shadow-gray-800 bg-white">
        <h1 className="title is-3 text-center">Lorem Ipsum CRM</h1>
        {error ? <MostrarMensaje mensaje={error} error={true} /> : null}
        <div className="field mt-3">
          <div className="control">
            <GoogleLogin
              clientId={CLIENT_ID}
              render={renderProps => (
                <button
                  className="button is-medium font-semibold w-full shadow-lg hover:bg-gray-100
                    text-deep-purple-900 border-deep-purple-900 hover:text-deep-purple-900 hover:border-deep-purple-900"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={brands("google")} />
                  </span>
                  <span>Iniciar Sesión con Google</span>
                </button>
              )}
              buttonText="Login"
              onSuccess={loginGoogle}
              onFailure={() => setError("Ocurrió un error al intentar iniciar sesión con google.")}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
        <div className="divider">O</div>
        <form onSubmit={login}>
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
                className="button is-medium font-semibold w-full shadow-lg text-white hover:text-white focus:text-white
                hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700"
                type="submit"
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