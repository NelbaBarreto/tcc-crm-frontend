import React, { useState, useContext } from "react";
import AppContext from "../../utils/AppContext";
import { Input, Dropdown, TextArea, Checkbox } from "../formulario/Componentes";
import { getTiposTelefono } from "../../api/personas";
import { useQuery } from "react-query";
import { handleDispatch } from "../formulario/reducerFormularios";

const TELEFONO = "telefono";

const Telefono = () => {
  const { state: { telefono }, dispatch } = useContext(AppContext);
  const [select, setSelect] = useState({ tipo: "" });

  const {
    data: tipos,
    tiposLoading
  } = useQuery(["tipos"], getTiposTelefono);

  const opcionesTipos = !tipos || tiposLoading ? [] :
    tipos.map(tipo => ({ value: tipo, label: tipo }));

  return (
    <section className="mb-2 p-4 border-gray-300 border-solid border">
      <div className="columns">
        <div className="column">
          <Input
            name="numero"
            label="Número"
            value={telefono?.numero || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TELEFONO)}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Tipo"
            name="tipo"
            onChange={e => {
              handleDispatch(dispatch, "tipo", e?.value, TELEFONO);
              setSelect({ ...select, tipo: e })
            }}
            value={select.tipo}
            options={opcionesTipos}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextArea
            label="Comentario"
            name="comentario"
            value={telefono?.comentario || ""}
            onChange={e => handleDispatch(dispatch, "comentario", e?.value, TELEFONO)}
          />
        </div>
        <div className="column">
          <Checkbox
            label="Principal"
            name="principal"
            checked={telefono?.principal || false}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.checked, TELEFONO)}
          />
        </div>
      </div>
    </section>
  );
}

export default Telefono;