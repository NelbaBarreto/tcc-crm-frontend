import React, { useState } from "react";
import Select from "react-select";
import Seccion from "../formulario/Seccion";
import { Eliminar } from "../formulario/Acciones";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Persona = ({ persona, setPersona }) => {
  const options = [
    { value: "CI", label: "CI" },
    { value: "RUC", label: "RUC" },
    { value: "Pasaporte", label: "Pasaporte" }
  ];
  const [tip_documento, setTipDocumento] = useState("");

  return (
    <Seccion titulo="Datos Personales">
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
            onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value, empleado: { ...persona.empleado, usuario: { ...persona.empleado.usuario, [e.target.name]: e.target.value } } })}
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
                isClearable={true}
                onChange={e => { setPersona({ ...persona, tip_documento: e?.value || " " }); setTipDocumento(e) }}
                value={tip_documento}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </Seccion>
  );
}

const Direcciones = () => {
  const [inputList, setInputList] = useState([]);

  const onAddClick = e => {
    e.preventDefault();
    setInputList(inputList.concat(<Direccion key={inputList.length} />));
  };

  const Direccion = () => {
    return (
      <section className="mb-2 p-4 border-gray-300 border-solid border">
        <div className="field">
          <label className="label">Calle 1</label>
          <div className="control">
            <input
              name="nombre"
              className="input shadow-lg"
              type="text"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Calle 2</label>
          <div className="control">
            <input
              name="nombre"
              className="input shadow-lg"
              type="text"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Código Postal</label>
          <div className="control">
            <input
              name="nombre"
              className="input shadow-lg"
              type="text"
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">País</label>
              <div className="control">
                <Select
                  name="pais_id"
                  className="shadow-lg"
                  placeholder=""
                  options={[{ value: 1, label: "Paraguay" }]}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Ciudad</label>
              <div className="control">
                <Select
                  name="ciudad_id"
                  className="shadow-lg"
                  placeholder=""
                  options={[{ value: 1, label: "Asunción" }]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Principal</label>
          <div className="control">
            <input
              name="principal"
              type="checkbox"
            />
          </div>
        </div>
        <Eliminar onClick={e => console.log(e)} />
      </section>
    );
  }

  return (
    <Seccion titulo="Direcciones">
      <div>
        {inputList}
      </div>
      <button
        className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        onClick={onAddClick}
      >
        <span>Agregar Dirección</span>
        <span className="icon is-small">
          <FontAwesomeIcon icon={solid("plus")} />
        </span>
      </button>
    </Seccion>
  );
}

const Telefonos = () => {
  const [inputList, setInputList] = useState([]);

  const onAddClick = e => {
    e.preventDefault();
    setInputList(inputList.concat(<Telefono key={inputList.length} />));
  };

  const Telefono = () => {
    return (
      <section className="mb-2 p-4 border-gray-300 border-solid border">
        <div className="field">
          <label className="label">Calle 1</label>
          <div className="control">
            <input
              name="nombre"
              className="input shadow-lg"
              type="text"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Calle 2</label>
          <div className="control">
            <input
              name="nombre"
              className="input shadow-lg"
              type="text"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Código Postal</label>
          <div className="control">
            <input
              name="nombre"
              className="input shadow-lg"
              type="text"
            />
          </div>
        </div>
        <Eliminar />
      </section>
    );
  }

  return (
    <Seccion titulo="Teléfonos">
      <button
        className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        onClick={onAddClick}
      >
        <span>Agregar Teléfono</span>
        <span className="icon is-small">
          <FontAwesomeIcon icon={solid("plus")} />
        </span>
      </button>
    </Seccion>
  );
}

const CrearPersona = ({ persona, setPersona }) => {
  return (
    <section>
      <Persona persona={persona} setPersona={setPersona} />
      <Direcciones />
      <Telefonos />
    </section>
  );
}

export default CrearPersona;