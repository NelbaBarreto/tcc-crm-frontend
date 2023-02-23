import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import MostrarMensaje from "../formulario/MostrarMensaje";
import { Input } from "../formulario/Componentes";
import { GoogleLogin } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reducer } from "../formulario/reducerFormularios.js";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { autenticarUsuarios } from "../../api/usuarios";
import { classNameButton2 } from "../formulario/Componentes";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const IniciarSesion = ({ state = {} }) => {
  return (
    <div className="field mt-3">
      <div className="control">
        <button
          className={`${classNameButton2} w-full is-medium`}
          type="submit"
          disabled={!state.password || !state.nom_usuario}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

const Login = ({ setToken }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const navigate = useNavigate();

  const handleDispatch = e => {
    dispatch({ type: "LOGIN", payload: { name: e.target.name, value: e.target.value } })
  }

  const handleError = error => {
    dispatch({ type: "LOGIN", payload: { name: "error", value: error } })
  }

  const login = async e => {
    e.preventDefault();
    try {
      handleError("");
      const { token, user, error } = await autenticarUsuarios(state.login);
      if (token) {
        setToken(token, user);
        handleError("");
        navigate("/dashboard");
      } else {
        handleError(error);
      }
    } catch {
      handleError("Ocurrió un error al intentar iniciar sesión");
    }
  };

  return (
    <div className="hero is-fullheight bg-deep-purple-400">
      <section className="section sm:w-1/2 w-full m-auto hero shadow-lg shadow-gray-800 bg-white rounded-md">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <img src="/logo.png" className="m-auto" style={{ height: "90px" }} alt="" />
          </div>
        </div>
        {state.login?.error ? <MostrarMensaje mensaje={state.login.error} error={true} /> : null}
        <form onSubmit={login}>
          <Input
            label="Nombre de Usuario"
            name="nom_usuario"
            value={state.login?.nom_usuario || ""}
            className="input is-medium shadow-lg"
            onChange={handleDispatch}
          />
          <Input
            label="Contraseña"
            name="password"
            value={state.login?.password || ""}
            className="input is-medium shadow-lg"
            type="password"
            onChange={handleDispatch}
          />
          <IniciarSesion 
            state={state.login} 
          />
        </form>
      </section>
    </div>
  );
}

export default Login;