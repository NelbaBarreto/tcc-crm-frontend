import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { deleCaso, getOrigenes, getPrioridades, getEstados, getTipos, getCaso } from "../../../api/casos";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CASO = "caso";

const EliminarCaso = () => {
    const { state: { caso }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({ estado: "", origen: "", usu_asignado: "", prioridad: ""  });
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentCaso,
      isFetching,
    } = useQuery(["caso", id], () => getCaso(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({ estado: "", origen: "", usu_asignado: "", prioridad: "" });
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentCaso, CASO);
        setSelect({
            estado: { label: currentCaso.estado, value: currentCaso.estado },
            origen: { label: currentCaso.origen, value: currentCaso.origen },
            prioridad: { label: currentCaso.prioridad, value: currentCaso.prioridad },
            tipo: { label: currentCaso.tipo, value: currentCaso.tipo },
            usu_asignado: { label: currentCaso.usuario?.nom_usuario, value: currentCaso.usuario?.usuario_id }
        });
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await deleCaso(caso.caso_id);
        setAction({ saving: false, error: false, message: "Caso Eliminado exitosamente." });
        setTimeout(() => navigate("/soporte/casos"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar este Caso?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarCaso;