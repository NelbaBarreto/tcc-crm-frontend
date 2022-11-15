import React, { useState, useContext } from "react";
import AppContext from "../../utils/AppContext";
import { Input, Dropdown, TextArea, Checkbox } from "../formulario/Componentes";
import { useQuery } from "react-query";
import { getPaises } from "../../api/paises";
import { getTiposDireccion } from "../../api/personas";
import { getCiudades } from "../../api/ciudades";
import { handleDispatch } from "../formulario/reducerFormularios";

const DIRECCION = "direccion";

const Direccion = () => {
  const { state: { direccion }, dispatch } = useContext(AppContext);
  const [select, setSelect] = useState({ pais: "", ciudad: "", tipo: "" });

  const {
    data: paises,
    paisesLoading
  } = useQuery(["paises"], getPaises);

  const {
    data: ciudades,
    ciudadesLoading
  } = useQuery(["ciudades"], getCiudades);

  const {
    data: tipos,
    tiposLoading
  } = useQuery(["tiposDireccion"], getTiposDireccion);

  const opcionesPais = !paises || paisesLoading ? [] :
    paises.map(pais => ({ value: pais.pais_id, label: pais.nombre }));

  const opcionesCiudad = !ciudades || ciudadesLoading ? [] :
    ciudades.map(ciudad => ({ value: ciudad.ciudad_id, label: ciudad.nombre }));

  const opcionesTipos = !tipos || tiposLoading ? [] :
    tipos.map(tipo => ({ value: tipo, label: tipo }));

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
              setSelect({ ...select, tipo: e })
            }}
            value={select.tipo}
            options={opcionesTipos}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="País"
            name="pais"
            onChange={e => {
              handleDispatch(dispatch, "pais_id", e?.value, DIRECCION);
              setSelect({ ...select, pais: e })
            }}
            value={select.pais}
            options={opcionesPais}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Ciudad"
            name="ciudad"
            onChange={e => {
              handleDispatch(dispatch, "ciudad_id", e?.value, DIRECCION);
              setSelect({ ...select, ciudad: e })
            }}
            value={select.ciudad}
            options={opcionesCiudad}
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
        <div className="column">
          <Checkbox
            label="Principal"
            name="principal"
            checked={direccion?.principal || false}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.checked, DIRECCION)}
          />
        </div>
      </div>
    </section>
  );
}

export default Direccion;