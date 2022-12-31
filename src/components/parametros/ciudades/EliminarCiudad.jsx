import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { getCiudad, deleCiudad  } from "../../../api/ciudades";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CIUDAD = "ciudad";

const EliminarCiudad = () => {
    const { state: { ciudad }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({ pais: "" });
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentCiudad,
      isFetching,
    } = useQuery(["ciudad", id], () => getCiudad(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({ pais: "" });
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentCiudad, CIUDAD);
        setSelect({
          pais: { label: currentCiudad.pais?.nombre, value: currentCiudad.pais?.pais_id },
        });
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await deleCiudad(ciudad.ciudad_id);
        setAction({ saving: false, error: false, message: "Ciudad Eliminada exitosamente." });
        setTimeout(() => navigate("/parametros/ciudades"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar esta Ciudad?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarCiudad;