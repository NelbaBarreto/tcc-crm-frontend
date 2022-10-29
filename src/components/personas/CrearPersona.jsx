import React, { useState, useReducer } from "react";
import Seccion from "../formulario/Seccion";
import Direccion from "./Direccion";
import { Dropdown, Input, classNameButton2 } from "../formulario/Componentes";
import { Eliminar } from "../formulario/Acciones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { reducer, handleDispatch } from "../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { getTipDocumentos } from "../../api/personas";

const PERSONA = "persona";

const Persona = ({ dispatch, persona }) => {
  const [select, setSelect] = useState({ tip_documento: "" });

  const {
    data: tip_documentos,
    tiposDocumentosLoading
  } = useQuery(["tip_documentos"], getTipDocumentos);

  const opcionesTipDocumentos = tiposDocumentosLoading || !tip_documentos ? [] :
    tip_documentos.map(tip_documento => ({ value: tip_documento, label: tip_documento }));

  return (
    <Seccion titulo="Datos Personales">
      <Input
        label="Nombre"
        name="nombre"
        value={persona?.nombre || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, PERSONA)}
      />
      <Input
        label="Email"
        name="email"
        value={persona?.email || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, PERSONA)}
      />
      <div className="columns">
        <div className="column">
          <Input
            label="Número de Documento"
            name="nro_documento"
            value={persona?.nro_documento || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, PERSONA)}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Tipo de Documento"
            name="tip_documento"
            onChange={e => {
              handleDispatch(dispatch, "tip_documento", e?.value, PERSONA);
              setSelect({ ...select, tip_documento: e })
            }}
            value={select.tip_documento}
            options={opcionesTipDocumentos}
          />
        </div>
      </div>
    </Seccion>
  );
}

const Direcciones = () => {
  const [inputList, setInputList] = useState([]);

  const onAddClick = e => {
    e.preventDefault();
    setInputList(inputList.concat(
      <Direccion
        key={inputList.length}
        index={inputList.length}
      />
    ));
  };

  return (
    <Seccion titulo="Direcciones">
      <div>
        {inputList}
      </div>
      <button
        className={classNameButton2}
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
        className={classNameButton2}
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

const CrearPersona = () => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <section>
      <Persona persona={state.persona} dispatch={dispatch} />
      <Direcciones persona={state.direcciones} dispatch={dispatch} />
      <Telefonos persona={state.telefonos} dispatch={dispatch} />
    </section>
  );
}

export default CrearPersona;