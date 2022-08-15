import React, { useState } from "react";
import Select from "react-select";
import ModalUsuario from "../empleados/ModalUsuario";
import { useQuery } from "react-query";
import { createUsuarios } from "../../api/usuarios";

const DatosPersona = ({ persona, setPersona }) => {
  const [tip_documento, setTipDocumento] = useState("");
  const options = [
    { value: "CI", label: "CI" },
    { value: "RUC", label: "RUC" },
    { value: "Pasaporte", label: "Pasaporte" }
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
            value={persona.nombre || ""}
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
            value={persona.email || ""}
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
                value={persona.nro_documento || ""}
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
                name="tip_documento"
                className="shadow-lg"
                placeholder=""
                onChange={e => { setPersona({ ...persona, tip_documento: e.value }); setTipDocumento(e) }}
                value={tip_documento}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

const DatosEmpleado = ({ persona, setPersona }) => {
  return (
    <section>
      <div className="divider">Datos del Empleado</div>
      <div className="field">
        <label className="label">Activo</label>
        <div className="control">
          <input
            name="activo"
            className="checkbox shadow-lg"
            value={persona.empleado.activo || false}
            onChange={e => setPersona({ ...persona, empleado: { ...persona.empleado, [e.target.name]: e.target.checked }})}
            type="checkbox"
          />
        </div>
      </div>
    </section>
  );
};

const CrearUsuario = () => {
  const [persona, setPersona] = useState({ empleado: {}, usuario: {} });
  const [modalIsOpen, setIsOpen] = useState(false);

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
          <DatosEmpleado persona={persona} setPersona={setPersona} />
          <ModalUsuario
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            persona={persona}
            setPersona={setPersona}
          />
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