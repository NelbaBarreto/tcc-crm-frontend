import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import MostrarMensaje from "../formulario/MostrarMensaje";
import { Input } from "../formulario/Componentes";
import { GoogleLogin } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reducer } from "../formulario/reducerFormularios.js";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { autenticarUsuarios } from "../../api/usuarios";
import { gapi } from "gapi-script";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const IniciarSesion = () => {
  return (
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
  );
}

const GoogleLoginButton = ({ loginReducer, handleError, setToken }) => {
  const { dispatch } = loginReducer;
  const navigate = useNavigate();

  const loginGoogle = async response => {
    try {
      const { token, user } = await autenticarUsuarios({ email: response.profileObj.email });
      if (token) {
        setToken(token, user);
        handleError("");
        navigate("/dashboard");
      } else {
        handleError(token?.data?.error);
      }
    } catch {
      handleError("Ocurrió un error al intentar iniciar sesión con google.");
    }
  }

  return (
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
          onFailure={() => dispatch({ type: "LOGIN", payload: { name: "error", value: "Ocurrió un error al intentar iniciar sesión." } })}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
}

const Login = ({ setToken }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const navigate = useNavigate();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "profile email"
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const handleDispatch = e => {
    dispatch({ type: "LOGIN", payload: { name: e.target.name, value: e.target.value } })
  }

  const handleError = error => {
    dispatch({ type: "LOGIN", payload: { name: "error", value: error } })
  }

  const login = async e => {
    e.preventDefault();
    try {
      const { token, user } = await autenticarUsuarios(state.login);
      if (token) {
        setToken(token, user);
        handleError("");
        navigate("/dashboard");
      } else {
        handleError(token?.data?.error);
      }
    } catch {
      handleError("Ocurrió un error al intentar iniciar sesión");
    }
  };

  return (
    <div className="hero is-fullheight bg-deep-purple-400">
      <section className="section sm:w-1/2 w-full m-auto hero shadow-lg shadow-gray-800 bg-white">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <img src="/logo.png" className="m-auto" style={{ height: "90px" }} alt="" />
          </div>
        </div>
        {state.login?.error ? <MostrarMensaje mensaje={state.login.error} error={true} /> : null}
        <GoogleLoginButton
          loginReducer={{ state, dispatch }}
          handleError={handleError}
          setToken={setToken}
        />
        <div className="divider">O</div>
        <form onSubmit={login}>
          <Input
            name="nom_usuario"
            value={state.login?.nom_usuario || ""}
            className="input is-medium shadow-lg"
            onChange={handleDispatch}
            placeholder="Ingresa tu nombre de usuario"
          />
          <Input
            name="password"
            value={state.login?.password || ""}
            className="input is-medium shadow-lg"
            type="password"
            placeholder="Ingresa tu contraseña"
            onChange={handleDispatch}
          />
          <IniciarSesion />
        </form>
      </section>
    </div>
  );
}

export default Login;