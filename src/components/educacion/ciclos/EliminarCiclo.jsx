import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { deleCiclo, getCiclo } from "../../../api/ciclos";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CICLO = "ciclo";

const EliminarCiclo = () => {
    const { state: { ciclo }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({ nivel: "", fec_inicio: "", fec_fin: "", detalles: "" });
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentCiclo,
      isFetching,
    } = useQuery(["ciclo", id], () => getCiclo(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({ nivel: "", fec_inicio: "", fec_fin: "", detalles: ""  });
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentCiclo, CICLO);
        setSelect({
          nivel: { label: currentCiclo.nivel, value: currentCiclo.ciclo },
          fec_inicio: { label: currentCiclo.fec_inicio, value: currentCiclo.fec_inicio },
          fec_fin: { label: currentCiclo.fec_fin, value: currentCiclo.fec_fin },
          detalles: { label: currentCiclo.detalles, value: currentCiclo.detalles }
        });
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await deleCiclo(ciclo.ciclo_id);
        setAction({ saving: false, error: false, message: "Ciclo Eliminado exitosamente." });
        setTimeout(() => navigate("/educacion/ciclos"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar este Ciclo?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarCiclo;