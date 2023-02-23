/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import EditarPersona from "../../personas/EditarPersona";
import useToken from "../../../utils/useToken";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown } from "../../formulario/Componentes";
import { getOrganizaciones } from "../../../api/organizaciones";
import { editContacto, getContacto, getOrigenes } from "../../../api/contactos";
import { handleDispatch, handleStateCleared, handleDispatchEdit } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CONTACTO = "contacto";

const DatosContacto = ({ dispatch, select = {} }) => {
  const {
    data: organizaciones,
    organizacionesLoading
  } = useQuery(["organizaciones"], getOrganizaciones);

  const {
    data: origenes,
  } = useQuery(["origenes"], getOrigenes);

  const opcionesOrganizaciones = organizacionesLoading || !organizaciones ? [] :
    organizaciones.map(organizacion => ({ value: organizacion.organizacion_id, label: organizacion.persona.nombre }));

  return (
    <Seccion titulo="Datos del Contacto">
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Organización"
            value={select.organizacion}
            options={opcionesOrganizaciones}
            onChange={e => {
              handleDispatch(dispatch, "organizacion_id", e?.value, CONTACTO);
              handleDispatch(dispatch, "organizacion", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Origen"
            value={select.origen}
            options={origenes}
            onChange={e => {
              handleDispatch(dispatch, "origen", e?.value, CONTACTO);
              handleDispatch(dispatch, "origen", e, "select")
            }}
          />
        </div>
      </div>
    </Seccion>
  );
};

const EditarContacto = () => {
  const { state: { contacto, persona, direcciones, telefonos, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const [enabled, setEnabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  const {
    data: currentContacto,
    isFetching,
  } = useQuery(["contacto", id], () => getContacto(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching && enabled) {
      setEnabled(false);
      handleDispatchEdit(dispatch, currentContacto, CONTACTO);
      handleDispatchEdit(dispatch, currentContacto.persona, "persona");
      handleDispatchEdit(dispatch, currentContacto.persona.telefonos, "telefonos");
      handleDispatchEdit(dispatch, currentContacto.persona.direcciones, "direcciones");
      handleDispatchEdit(dispatch, {
        origen: { label: currentContacto.origen, value: currentContacto.origen },
        organizacion: currentContacto.organizacion ?
          { label: currentContacto.organizacion?.persona.nombre, value: currentContacto.organizacion?.organizacion_id } : "",
        tip_documento: currentContacto.persona?.tip_documento ? 
          { label: currentContacto.persona?.tip_documento, value: currentContacto.persona?.tip_documento } : null,
      }, "select");
    }
  }, [isFetching]);

  const editar = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };
    try {
      await editContacto(id, {
        ...contacto,
        ...auditoria,
        persona: { ...persona, direcciones, telefonos, ...auditoria }
      });
      setAction({ saving: false, error: false, message: "Contacto editado exitosamente." });
      setTimeout(() => navigate("/ventas/contactos"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Editar Contacto
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <EditarPersona />
          <DatosContacto
            contacto={contacto}
            select={select}
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

export default EditarContacto;