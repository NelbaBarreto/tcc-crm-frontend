import React, { useState } from "react";
import Select from "react-select";
import ModalUsuario from "../empleados/ModalUsuario";
import { useQuery } from "react-query";
import { createUsuarios } from "../../api/usuarios";

const DatosPersona = ({ persona, setPersona }) => {
  const options = [
    { value: "ci", label: "CI" },
    { value: "ruc", label: "RUC" },
    { value: "pasaporte", label: "Pasaporte" }
  ]

  return (
    <section>
      <div className="divider">Datos Personales</div>
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control">
          <input
            name="nombre"
            className="input shadow-lg"
            value={persona.nombre}
            onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value })}
            type="text"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            name="email"
            className="input shadow-lg"
            value={persona.email}
            onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value })}
            type="email"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Número de Documento</label>
            <div className="control">
              <input
                name="nro_documento"
                className="input shadow-lg"
                value={persona.nro_documento}
                onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value })}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Tipo de Documento</label>
            <div className="control">
              <Select
                className="shadow-lg"
                placeholder=""
                onChange={e => setPersona({ ...persona, tip_documento: e.value })}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

const CrearUsuario = () => {
  const empleado = { 
                    empleado: {},
                    usuario: {},
                    nombre: "",
                    email: "",
                    nro_documento: "",
                    tip_documento: ""
                  };
  const [persona, setPersona] = useState({...empleado});
  const [modalIsOpen, setIsOpen] = useState(false);
console.log(persona)
  const crear = async e => {
    e.preventDefault();
    await createUsuarios(persona);
  };

  return (
    <div className="hero is-fullheight bg-lila-400">
      <section className="section sm:w-1/2 w-full m-auto hero shadow-lg shadow-gray-800 bg-white">
        <h1 className="title is-3 text-center">Nuevo Empleado</h1>
        <form>
          <DatosPersona persona={persona} setPersona={setPersona} />
          <ModalUsuario modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
          <div className="field mt-3">
            <div className="control">
              <button
                className="button float-right font-semibold shadow-lg text-white hover:text-white hover:bg-lila-700 bg-lila-400 border-lila-700"
                onClick={e => crear(e)}
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CrearUsuario;