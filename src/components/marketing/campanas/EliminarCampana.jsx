import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { deleCampana, getPrioridades, getEstados, getCampana } from "../../../api/campanas";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CAMAPANA = "campana";

const EliminarCampana = () => {
    const { state: { campana }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({ nombre: "", fec_inicio: "", fec_fin: ""});
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentCampana,
      isFetching,
    } = useQuery(["campana", id], () => getCampana(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({ nombre: "", fec_inicio: "", fec_fin: "" });
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentCampana, CAMAPANA);
        setSelect({
          nombre: { label: currentCampana.nombre, value: currentCampana.nombre },
          fec_inicio: { label: currentCampana.fec_inicio, value: currentCampana.fec_inicio },
          fec_fin: { label: currentCampana.fec_fin, value: currentCampana.fec_fin }
        });
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await deleCampana(campana.campana_id);
        setAction({ saving: false, error: false, message: "Campaña Eliminada exitosamente." });
        setTimeout(() => navigate("/marketing/campanas"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar esta Campaña?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarCampana;