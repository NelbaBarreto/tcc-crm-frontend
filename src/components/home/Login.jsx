import React from "react";
import {NavLink} from "react-router-dom";

const Login = () => {
  return (
    <div className="hero is-fullheight bg-lila-400">
      <section className="section sm:w-1/2 w-full m-auto hero shadow-lg shadow-gray-800 bg-white">
        <h1 className="title is-3 text-center">Lorem Ipsum CRM</h1>
        <form>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input is-medium shadow-lg" type="email" placeholder="Ingresa tu dirección de email" />
            </div>
          </div>
          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input className="input is-medium shadow-lg" type="password" placeholder="Ingresa tu contraseña" />
            </div>
          </div>
          <a href="/" className="font-bold has-text-link text">¿Olvidaste tu contraseña?</a>

          <div class="field mt-3">
            <div class="control">
              <NavLink
                className="button is-medium font-semibold w-full shadow-lg text-white hover:text-white hover:bg-lila-700 bg-lila-400 border-lila-700"
                to="/"
              >
                Iniciar Sesión
              </NavLink>
            </div>
          </div>

          <div className = "field mt-3">
            <div className = "control">
              <button 
                className = "button is-medium font-semibold w-full shadow-lg hover:bg-gray-200"
                style = {{ borderColor: "#1E40AF", color: "#130b43" }}
              >
                Iniciar Sesión con Google
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;