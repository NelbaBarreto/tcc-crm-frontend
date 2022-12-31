import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { deleLlamada, getTipos, getEstados, getLlamada } from "../../../api/llamadas";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const LLAMADA = "llamada";

const EliminarLlamada = () => {
    const { state: { llamada }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({ estado: "", tipo: "" });
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentLlamada,
      isFetching,
    } = useQuery(["llamada", id], () => getLlamada(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({ estado: "", tipo: "" });
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentLlamada, LLAMADA);
        setSelect({
            estado: { label: currentLlamada.estado, value: currentLlamada.estado },
            tipo: { label: currentLlamada.tipo, value: currentLlamada.tipo },
        });
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await deleLlamada(llamada.llamada_id);
        setAction({ saving: false, error: false, message: "Llamada Eliminada exitosamente." });
        setTimeout(() => navigate("/actividades/llamadas"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar esta Llamada?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarLlamada;