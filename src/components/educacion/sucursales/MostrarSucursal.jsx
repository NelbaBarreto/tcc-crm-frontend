import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getSucursal } from "../../../api/sucursales";
import { format, parseISO } from "date-fns";

const DatosSucursal = ({ sucursal = {} }) => {
    return (
        <Seccion titulo={sucursal.nombre}>
            <div className="columns">
                <div className="column">
                    <TextView label="País" value={sucursal.pai.nombre} />
                </div>
                <div className="column">
                    <TextView label="Fecha de Creación" value={format(parseISO(sucursal.fec_insercion), "dd/MM/yyyy hh:mm")} />
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <TextView label="Calle 1" value={sucursal.direccion.calle_1} />
                </div>
                <div className="column">
                    <TextView label="Calle 2" value={sucursal.direccion.calle_2} />
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <TextView label="Tipo dirección" value={sucursal.direccion.tipo} />
                </div>
                <div className="column">
                    <TextView label="Referencia" value={sucursal.direccion.referencia} />
                </div>
            </div>
        </Seccion >
    );
}

const MostrarSucursal = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: sucursal,
        isLoading
    } = useQuery(["sucursal", id], () => getSucursal(id));

    return (
        <section className="section w-full m-auto">
            <div className="mb-4">
                {isLoading ?
                    <CircularProgress size={24} /> : <DatosSucursal sucursal={sucursal} navigate={navigate} />
                }
            </div>
            <Volver navigate={navigate} />
        </section>
    );
}

export default MostrarSucursal;