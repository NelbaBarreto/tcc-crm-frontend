import React, { useState, useContext } from "react";
import AppContext from "../../utils/AppContext";
import { Input, Dropdown, TextArea, Checkbox } from "../formulario/Componentes";
import { useQuery } from "react-query";
import { getPaises } from "../../api/paises";
import { getCiudades } from "../../api/ciudades";
import { handleDispatch } from "../formulario/reducerFormularios";

const DIRECCION = "direccion";

const Direccion = () => {
  const { state: { direccion }, dispatch } = useContext(AppContext);
  const [select, setSelect] = useState({ pais: "", ciudad: "" });

  const {
    data: paises,
    paisesLoading
  } = useQuery(["paises"], getPaises);

  const {
    data: ciudades,
    ciudadesLoading
  } = useQuery(["ciudades"], getCiudades);

  const opcionesPais = !paises || paisesLoading ? [] :
    paises.map(pais => ({ value: pais.pais_id, label: pais.nombre }));
  const opcionesCiudad = !ciudades || ciudadesLoading ? [] :
    ciudades.map(ciudad => ({ value: ciudad.ciudad_id, label: ciudad.nombre }));

  return (
    <section className="mb-2 p-4 border-gray-300 border-solid border">
      <Input
        label="Calle 1"
        name="calle_1"
        value={direccion?.calle_1 || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, DIRECCION)}
      />
      <Input
        label="Calle 2"
        name="calle_2"
        value={direccion?.calle_2 || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, DIRECCION)}
      />
      <Input
        label="Código Postal"
        name="cod_postal"
        value={direccion?.cod_postal || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, DIRECCION)}
      />
      <Dropdown
        label="País"
        name="pais"
        onChange={e => {
          handleDispatch(dispatch, "pais", e?.value, DIRECCION);
          setSelect({ ...select, tip_documento: e })
        }}
        value={select.pais}
        options={opcionesPais}
      />
      <Dropdown
        label="Ciudad"
        name="ciudad"
        onChange={e => {
          handleDispatch(dispatch, "ciudad", e?.value, DIRECCION);
          setSelect({ ...select, ciudad: e })
        }}
        value={select.ciudad}
        options={opcionesCiudad}
      />
      <TextArea
        label="Referencia"
        name="referencia"
        value={direccion?.referencia || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, DIRECCION)}
      />
      <Checkbox 
        label="Principal"
        name="principal"
        checked={direccion?.principal || false}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.checked, DIRECCION)}
      />
    </section>
  );
}

export default Direccion;