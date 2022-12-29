import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { deleTarea, getPrioridades, getEstados, getTarea } from "../../../api/tareas";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const TAREA = "tarea";

const EliminarTarea = () => {
    const { state: { tarea }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({ estado: "", prioridad: "" });
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentTarea,
      isFetching,
    } = useQuery(["tarea", id], () => getTarea(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({ estado: "", prioridad: "" });
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentTarea, TAREA);
        setSelect({
          estado: { label: currentTarea.estado, value: currentTarea.estado },
          prioridad: { label: currentTarea.prioridad, value: currentTarea.prioridad },
          usu_asignado: { label: currentTarea.usuario?.nom_usuario, value: currentTarea.usuario?.usuario_id }
        });
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await deleTarea(tarea.tarea_id);
        setAction({ saving: false, error: false, message: "Tarea Eliminada exitosamente." });
        setTimeout(() => navigate("/actividades/tareas"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar esta Tarea?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarTarea;