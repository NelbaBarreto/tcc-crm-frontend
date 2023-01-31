import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import EditarPersona from "../../personas/EditarPersona";
import useToken from "../../../utils/useToken";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { editProfesor, getProfesor } from "../../../api/profesores";
import { handleStateCleared, handleDispatchEdit } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const PROFESOR = "profesor";

const EditarCaso = () => {
  const { state: { profesor, persona, direcciones }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const [enabled, setEnabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  const {
    data: currentProfesor,
    isFetching,
  } = useQuery(["profesor", id], () => getProfesor(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching && enabled) {
      setEnabled(false);
      handleDispatchEdit(dispatch, currentProfesor, PROFESOR);
      handleDispatchEdit(dispatch, currentProfesor.persona, "persona");
      handleDispatchEdit(dispatch, currentProfesor.persona.telefonos, "telefonos");
      handleDispatchEdit(dispatch, currentProfesor.persona.direcciones, "direcciones");
      handleDispatchEdit(dispatch, {
        tip_documento: { label: currentProfesor.persona?.tip_documento, value: currentProfesor.persona?.tip_documento },
      }, "select");
    }
  }, [isFetching]);

  const editar = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };
    try {
      await editProfesor(id, {
        ...profesor,
        ...auditoria,
        persona: { ...persona, direcciones, ...auditoria }
      });
      setAction({ saving: false, error: false, message: "Profesor editado exitosamente." });
      setTimeout(() => navigate("/ventas/profesores"), 2000);
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
          <EditarPersona />
          <Guardar
            saving={action.saving}
            guardar={editar}
          />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarCaso;