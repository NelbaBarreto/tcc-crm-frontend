import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { deleteSucursal, getSucursal, deleteDireccion } from "../../../api/sucursales";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const SUCURSAL = "sucursal";

const EliminarSucursal = () => {
    const { state: { sucursal, direccion }, dispatch } = useContext(AppContext);
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentSucursal,
      isFetching,
    } = useQuery(["sucursal", id], () => getSucursal(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentSucursal, SUCURSAL);
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
      await deleteDireccion(sucursal.direccion.direccion_id);
      await deleteSucursal(sucursal.sucursal_id);
        setAction({ saving: false, error: false, message: "Sede eliminada exitosamente." });
        setTimeout(() => navigate("/educacion/sedes"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar esta Sede?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarSucursal;