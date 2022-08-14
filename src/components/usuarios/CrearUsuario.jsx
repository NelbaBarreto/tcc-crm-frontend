import React, { useState } from "react";
import Select from "react-select";
import ModalUsuario from "../empleados/ModalUsuario";
import { useQuery } from "react-query";
import { createUsuarios } from "../../api/usuarios";

const CrearUsuario = () => {
  const [persona, setPersona] = useState({ empleado: {}, usuario: {} });
  const [modalIsOpen, setIsOpen] = useState(false);


  const crear = async e => {
    e.preventDefault();
    await createUsuarios(persona);
  };

  const handleChange = ({ campo, valor }) => {
    console.log(campo, valor);
  };

  const options = [
    { value: "ci", label: "CI" },
    { value: "ruc", label: "RUC" },
    { value: "pasaporte", label: "Pasaporte" }
  ]

  const DatosPersona = () => {
    return (
      <section>
        <div className="divider">Datos Personales</div>
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control">
            <input
              className="input shadow-lg"
              type="text"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input shadow-lg" type="email" />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Número de Documento</label>
              <div className="control">
                <input
                  className="input shadow-lg"
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
                  options={options} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  };

  return (
    <div className="hero is-fullheight bg-lila-400">
      <section className="section sm:w-1/2 w-full m-auto hero shadow-lg shadow-gray-800 bg-white">
        <h1 className="title is-3 text-center">Nuevo Empleado</h1>
        <form>
          <DatosPersona />
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