import React, { useContext } from "react";
import AppContext from "../../utils/AppContext";
import { Input, Dropdown, TextArea } from "../formulario/Componentes";
import { getTiposTelefono } from "../../api/personas";
import { useQuery } from "react-query";
import { handleDispatch } from "../formulario/reducerFormularios";

const TELEFONO = "telefono";

const Telefono = () => {
  const { state: { telefono, select }, dispatch } = useContext(AppContext);

  const {
    data: tipos,
  } = useQuery(["tiposTelefono"], getTiposTelefono);

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
              handleDispatch(dispatch, "tipo", e, "select");
            }}
            value={select?.tipo}
            options={tipos}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextArea
            label="Comentario"
            name="comentario"
            value={telefono?.comentario || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TELEFONO)}
          />
        </div>
      </div>
    </section>
  );
}

export default Telefono;