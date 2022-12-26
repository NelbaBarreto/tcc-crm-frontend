import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { CircularProgress } from "@mui/material";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Datepicker, Input } from "../../formulario/Componentes";
import { useParams, useNavigate } from "react-router-dom";
import { createCampana, getCampana, editCampana } from "../../../api/campanas";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";


const CAMPANA = "campana";

const DatosCampana = ( campana, dispatch, manageSelect ) => {
     const { setSelect, select } = manageSelect;

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
          </Seccion>
  )
};

const EditarCampana = () => {
    const { state: { campana }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({});
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentCampana,
      isFetching,
    } = useQuery(["campana", id], () => getCampana(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({});
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentCampana, CAMPANA);
        setSelect({});
      }
    }, [isFetching]);
  
    const crear = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await editCampana(campana.campana_id, { ...campana });
        setAction({ saving: false, error: false, message: "Campaña editada exitosamente." });
        setTimeout(() => navigate("/marketing/campanas"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };
  
    return (
      <div>
        {isFetching ?
          <CircularProgress size={24} /> : <section className="section w-full m-auto">
            <Titulo1>
              Editar Campaña
            </Titulo1>
            {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            <form>
              <DatosCampana campana={campana} dispatch={dispatch} manageSelect={{ setSelect, select }} />
              <Guardar saving={action.saving} guardar={crear} />
              <Volver navigate={navigate} />
            </form>
          </section>}
      </div>
    )
  };
  
  export default EditarCampana;