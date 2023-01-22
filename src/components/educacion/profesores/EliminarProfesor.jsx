import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { deleteProfesor, getProfesor } from "../../../api/profesores";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const PROFESOR = "profesor";

const EliminarProfesor = () => {
    const { state: { profesor }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({ tip_documento: ""  });
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentProfesor,
      isFetching,
    } = useQuery(["profesor", id], () => getProfesor(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({ tip_documento: "" });
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentProfesor, PROFESOR);
        setSelect({
            tip_documento: { label: currentProfesor.persona?.tip_documento, value: currentProfesor.persona?.tip_documento },
        });
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await deleteProfesor(profesor.profesor_id);
        setAction({ saving: false, error: false, message: "Profesor Eliminado exitosamente." });
        setTimeout(() => navigate("/educacion/profesores"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar este Profesor?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarProfesor;