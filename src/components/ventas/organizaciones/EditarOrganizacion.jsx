/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import EditarPersona from "../../personas/EditarPersona";
import useToken from "../../../utils/useToken";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { TextArea, Input } from "../../formulario/Componentes";
import { editOrganizacion, getOrganizacion } from "../../../api/organizaciones";
import { handleDispatch, handleStateCleared, handleDispatchEdit } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const ORGANIZACION = "organizacion";

const DatosOrganizacion = ({ dispatch, organizacion }) => {
  return (
    <Seccion titulo="Datos de la Organización">
      <div className="columns">
        <div className="column">
          <Input
            name="website"
            label="Página Web"
            value={organizacion?.website || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, ORGANIZACION)}
          />
        </div>
        <div className="column">
          <TextArea
            name="descripcion"
            label="Descripción"
            value={organizacion?.descripcion || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, ORGANIZACION)}
          />
        </div>
      </div>
    </Seccion>
  );
};

const EditarOrganizacion = () => {
  const { state: { organizacion, persona, direcciones, telefonos }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const [enabled, setEnabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  const {
    data: currentOrganizacion,
    isFetching,
  } = useQuery(["organizacion", id], () => getOrganizacion(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching && enabled) {
      setEnabled(false);
      handleDispatchEdit(dispatch, currentOrganizacion, ORGANIZACION);
      handleDispatchEdit(dispatch, currentOrganizacion.persona, "persona");
      handleDispatchEdit(dispatch, currentOrganizacion.persona.telefonos, "telefonos");
      handleDispatchEdit(dispatch, currentOrganizacion.persona.direcciones, "direcciones");
      handleDispatchEdit(dispatch, {
        tip_documento: currentOrganizacion.persona?.tip_documento ? { label: currentOrganizacion.persona?.tip_documento, value: currentOrganizacion.persona?.tip_documento } : null,
      }, "select");
    }
  }, [isFetching]);

  const editar = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };
    try {
      await editOrganizacion(id, {
        ...organizacion,
        ...auditoria,
        persona: { ...persona, direcciones, telefonos, ...auditoria }
      });
      setAction({ saving: false, error: false, message: "Organización editada exitosamente." });
      setTimeout(() => navigate("/ventas/organizaciones"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Editar Organizacion
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <EditarPersona />
          <DatosOrganizacion
            organizacion={organizacion}
            dispatch={dispatch}
          />
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

export default EditarOrganizacion;