import React, { useContext } from "react";
import AppContext from "../../utils/AppContext";
import { Input, Dropdown, TextArea } from "../formulario/Componentes";
import { useQuery } from "react-query";
import { getTiposDireccion } from "../../api/personas";
import { handleDispatch } from "../formulario/reducerFormularios";

const DIRECCION = "direccion";

const Direccion = () => {
  const { state: { direccion, select }, dispatch } = useContext(AppContext);

  const {
    data: tipos,
  } = useQuery(["tiposDireccion"], getTiposDireccion);

  return (
    <section className="mb-2 p-4 border-gray-300 border-solid border">
      <div className="columns">
        <div className="column">
          <Input
            label="Calle 1"
            name="calle_1"
            value={direccion?.calle_1 || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, DIRECCION)}
          />
        </div>
        <div className="column">
          <Input
            label="Calle 2"
            name="calle_2"
            value={direccion?.calle_2 || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, DIRECCION)}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Input
            label="Código Postal"
            name="cod_postal"
            value={direccion?.cod_postal || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, DIRECCION)}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Tipo"
            name="tipo"
            onChange={e => {
              handleDispatch(dispatch, "tipo", e?.value, DIRECCION);
              handleDispatch(dispatch, "tipo", e?.value, "select")
            }}
            value={select?.tipo}
            options={tipos}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextArea
            label="Referencia"
            name="referencia"
            value={direccion?.referencia || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, DIRECCION)}
          />
        </div>
      </div>
    </section>
  );
}

export default Direccion;