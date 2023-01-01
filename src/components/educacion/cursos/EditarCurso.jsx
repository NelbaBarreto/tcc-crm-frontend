import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { CircularProgress } from "@mui/material";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea, Datepicker } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { getCurso, editCurso } from "../../../api/cursos";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CURSO = "curso";

const DatosCurso = ({ curso, dispatch }) => {

    return (
        <Seccion titulo="Datos del Curso">
            <Input
                name="nombre"
                label="Nombre"
                value={curso?.nombre || ""}
                onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CURSO)}
            />
            <TextArea
                name="descripcion"
                label="Descripción"
                value={curso?.descripcion || ""}
                onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CURSO)}
            />
        </Seccion >
    );
};

const EditarCurso = () => {
    const { state: { curso }, dispatch } = useContext(AppContext);
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: currentCurso,
        isFetching,
    } = useQuery(["curso", id], () => getCurso(id));

    useEffect(() => {
        handleStateCleared(dispatch);
    }, []);

    useEffect(() => {
        if (!isFetching) {
            handleDispatchEdit(dispatch, currentCurso, CURSO);
        }
    }, [isFetching]);

    const editar = async e => {
        e.preventDefault();
        setAction({ saving: true, error: false, message: "" });
        try {
            await editCurso(curso.curso_id, { ...curso });
            setAction({ saving: false, error: false, message: "Curso editado exitosamente." });
            setTimeout(() => navigate("/educacion/cursos"), 2000);
        } catch (e) {
            setAction({ saving: false, error: true, message: e.message });
        };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    Editar Curso
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
                <form>
                    <DatosCurso curso={curso} dispatch={dispatch} />
                    <Guardar saving={action.saving} guardar={editar} />
                    <Volver navigate={navigate} />
                </form>
            </section>
        </div>
    )
};

export default EditarCurso;