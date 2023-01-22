import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import useToken from "../../../utils/useToken";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { editProfesor, getProfesor } from "../../../api/profesores";
import { handleDispatch, handleStateCleared, handleDispatchEdit } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const PROFESOR = "profesor";

const EditarProfesor = () => {
  const { state: { profesor, persona, direcciones }, dispatch } = useContext(AppContext);
  const [select, setSelect] = useState({ tip_documento: "" });
  const [action, setAction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

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
        tip_documento: { label: currentProfesor.tip_documento, value: currentProfesor.tip_documento },
      });
    }
  }, [isFetching]);

  const editar = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };

    try {
      await editProfesor({
        ...profesor,
        ...auditoria,
        persona: { ...persona, direcciones, ...auditoria }
      });
      setAction({ saving: false, error: false, message: "Profesor editado exitosamente." });
      setTimeout(() => navigate("/educacion/profesores"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Profesor
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <CrearPersona />
          
          <Guardar saving={action.saving} guardar={editar} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarProfesor;