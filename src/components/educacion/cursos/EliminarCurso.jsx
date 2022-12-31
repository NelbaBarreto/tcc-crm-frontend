import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { deleCurso, getCurso } from "../../../api/cursos";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CURSO = "curso";

const EliminarCurso = () => {
    const { state: { curso }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({ nombre: "", descripcion: "" });
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentCurso,
      isFetching,
    } = useQuery(["curso", id], () => getCurso(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({ nombre: "", descripcion: "" });
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentCurso, CURSO);
        setSelect({
          nombre: { label: currentCurso.nombre, value: currentCurso.nombre },
          descripcion: { label: currentCurso.nombre, value: currentCurso.descripcion }
        });
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await deleCurso(curso.curso_id);
        setAction({ saving: false, error: false, message: "Curso Eliminado exitosamente." });
        setTimeout(() => navigate("/educacion/cursos"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar este Curso?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarCurso;