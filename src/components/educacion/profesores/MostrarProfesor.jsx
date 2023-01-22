import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getProfesor } from "../../../api/profesores";

const DatosProfesor = ({ profesor = {} }) => {
    return (
        <Seccion titulo={profesor?.persona.nombre}>
            <div className="columns">
                <div className="column">
                    <TextView label="Codigo profesor" value={profesor.profesor_id} />
                </div>
                <div className="column">
                    <TextView label="Correo" value={profesor.persona.email} />
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <TextView label="Tipo Documento" value={profesor.persona.tip_documento} />
                </div>
                <div className="column">
                    <TextView label="Numero Documento" value={profesor.persona.nro_documento} />
                </div>
            </div>
            
        </Seccion>
    );
}

const MostrarProfesor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: profesor,
        isLoading
    } = useQuery(["profesor", id], () => getProfesor(id));

    return (
        <section className="section w-full m-auto">
            <div className="mb-4">
                {isLoading ?
                    <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosProfesor profesor={profesor} navigate={navigate} />
                }
            </div>
            <Volver navigate={navigate} />
        </section>
    );
}

export default MostrarProfesor;