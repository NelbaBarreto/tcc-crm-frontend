import React from "react";
import {createUsuarios} from "../../api/usuarios";

const CrearUsuario = () => {
  const crear = async e => {
    e.preventDefault();
      await createUsuarios({ nom_usuario: "nbarreto", activo: true, password: "123456" });
  };

  return (
    <div className="hero is-fullheight bg-lila-400">
      <section className="section sm:w-1/2 w-full m-auto hero shadow-lg shadow-gray-800 bg-white">
        <h1 className="title is-3 text-center">Crear Empleado</h1>
        <form>
         <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input is-medium shadow-lg" type="email" placeholder="Ingresa tu dirección de email" />
            </div>
          </div>
          <div className="field">
            <label className="label">Nombre de Usuario</label>
            <div className="control">
              <input className="input is-medium shadow-lg" type="text" placeholder="Ingresa tu nombre de usuario" />
            </div>
          </div>
          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input className="input is-medium shadow-lg" type="password" placeholder="Ingresa tu contraseña" />
            </div>
          </div>
          <div className="field">
            <label className="label">Activo</label>
            <div className="control">
              <input className="checkbox is-medium shadow-lg" type="checkbox" />
            </div>
          </div>
          <div className = "field mt-3">
            <div className = "control">
              <button 
                className = "button is-medium font-semibold w-full shadow-lg hover:bg-gray-200"
                style={{ borderColor: "#1E40AF", color: "#130b43" }}
                onClick={e => crear(e)}
              >
                Aceptar
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CrearUsuario;