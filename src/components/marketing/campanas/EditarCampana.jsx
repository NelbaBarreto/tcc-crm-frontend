/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import useToken from "../../../utils/useToken";
import { CircularProgress } from "@mui/material";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Datepicker, Input, TextArea } from "../../formulario/Componentes";
import { useParams, useNavigate } from "react-router-dom";
import { getCampana, editCampana } from "../../../api/campanas";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";

const CAMPANA = "campana";

const DatosCampana = ({ campana = {}, dispatch }) => {
  return (

    <Seccion titulo="Datos de la Campaña">
      <Input
        name="nombre"
        label="Nombre"
        value={campana?.nombre || ""}
        onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CAMPANA)}
      />
      <div className="columns">
        <div className="column">
          <Datepicker
            label="Fecha de Inicio"
            selected={campana?.fec_inicio || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, CAMPANA)}
          />
        </div>
        <div className="column">
          <Datepicker
            label="Fecha Fin"
            selected={campana?.fec_fin || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_fin", fecha, CAMPANA)}
          />
        </div>
      </div>
      <TextArea
        name="descripcion"
        label="Descripcion"
        value={campana?.descripcion || ""}
        onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CAMPANA)}
      />
    </Seccion>
  )
};

const EditarCampana = () => {
  const { state: { campana }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  const {
    data: currentCampana,
    isFetching,
  } = useQuery(["campana", id], () => getCampana(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching) {
      handleDispatchEdit(dispatch, currentCampana, CAMPANA);

    }
  }, [isFetching]);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };

    try {
      await editCampana(campana.campana_id, { ...campana, ...auditoria, });
      setAction({ saving: false, error: false, message: "Campaña editada exitosamente." });
      setTimeout(() => navigate("/marketing/campanas"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      {isFetching ?
        <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <section className="section w-full m-auto">
          <Titulo1>
            Editar Campaña
          </Titulo1>
          {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
          <form>
            <DatosCampana campana={campana} dispatch={dispatch} />
            <Guardar saving={action.saving} guardar={crear} />
            <Volver navigate={navigate} />
          </form>
        </section>}
    </div>
  )
};

export default EditarCampana;