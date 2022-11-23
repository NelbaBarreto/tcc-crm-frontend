import React, { useState, useContext, useEffect } from "react";
import { Volver, Guardar } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { createCiudad } from "../../../api/ciudades";
import { getPaises } from "../../../api/paises";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Dropdown, Input } from "../../formulario/Componentes";
import { Titulo1 } from "../../formulario/Titulo";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";

const CIUDAD = "ciudad";

const DatosCiudad = ({ ciudad, dispatch }) => {
  const [select, setSelect] = useState({});

  const {
    data: paises,
    paisesLoading
  } = useQuery(["paises"], getPaises);

  const opcionesPaises = paisesLoading || !paises ? [] :
    paises.map(pais => ({ value: pais.pais_id, label: pais.nombre }));

  return (
    <Seccion titulo="Datos de la Ciudad">
      <Input
        name="nombre"
        label="Nombre"
        value={ciudad?.nombre || ""}
        onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CIUDAD)}
      />

      <Dropdown
        label="Paises"
        value={select.pais}
        options={opcionesPaises}
        onChange={e => {
          handleDispatch(dispatch, "pais_id", e?.value, CIUDAD);
          setSelect({ ...select, pais: e })
        }}
      />


    </Seccion>
  );
};

const CrearCiudad = () => {
  const { state: { ciudad }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);
  
  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createCiudad({ ...ciudad });
      setAction({ saving: false, error: false, message: "Ciudad registrada exitosamente." });
      setTimeout(() => navigate("/parametros/ciudades"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Ciudad
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosCiudad ciudad={ciudad} dispatch={dispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearCiudad;