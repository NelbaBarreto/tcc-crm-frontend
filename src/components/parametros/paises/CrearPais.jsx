import React, { useState, useContext } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Input } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { createPais } from "../../../api/paises";

const PAIS = "pais";

const DatosPais = ({ pais, dispatch }) => {
  return (
    <Seccion titulo="Datos del Pais">
      <div className="columns">
        <div className="column">
          <Input
            name="nombre"
            label="Nombre"
            value={pais?.nombre || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, PAIS)}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Input
            name="nom_corto"
            label="Nombre corto"
            value={pais?.nom_corto || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, PAIS)}
          />
        </div>
        <div className="column">
          <Input
            name="cod_telefono"
            label="Prefijo Telefónico"
            value={pais?.cod_telefono || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, PAIS)}
          />
        </div>
      </div>
    </Seccion >
  );
};

const CrearPais = () => {
  const { state: { pais }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createPais({ ...pais });
      setAction({ saving: false, error: false, message: "Pais registrado exitosamente." });
      handleStateCleared(dispatch);
      setTimeout(() => navigate("/parametros/paises"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };


  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Pais
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosPais pais={pais} dispatch={dispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearPais;