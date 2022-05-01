import React from "react";

const Login = ({ history }) => {
  return (
    <div className="section">
      <h3 
        className="title is-3 text-center mt-5" 
        style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
      >
        Iniciar Sesión
      </h3>
      <div className="w-1/2 m-auto bg-gray-200 p-8 rounded-sm">
        <form>
          <label htmlFor="email" className="label">Correo Electrónico</label>
          <input type="text" id="email" className="input" />
          <label htmlFor="password" className="label">Contraseña</label>
          <input type="text" id ="password" className="input" />
          <button type="submit" className="button is-dark is-rounded mt-5">
            Aceptar
          </button>
        </form>
      </div>
      <button className="button is-link absolute mb-4" onClick={() => history.push("/")}>
        Volver
      </button>
    </div>
  );
}

export default Login;