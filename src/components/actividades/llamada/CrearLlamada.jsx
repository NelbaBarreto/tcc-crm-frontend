import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import Seccion from "../../formulario/Seccion";
import useToken from "../../../utils/useToken";
import { getTipos, getEstados, createLlamada } from "../../../api/llamadas";
import { getUsuarios } from "../../../api/usuarios";
import { getLeads } from "../../../api/leads";
import { getContactos } from "../../../api/contactos";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea, Datepicker } from "../../formulario/Componentes";

const LLAMADA = "llamada";

const CrearLlamada = () => {
  const { state: { llamada, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: tipos,
  } = useQuery(["tipos"], getTipos);

  const {
    data: leads,
    leadsLoading
  } = useQuery(["leads"], getLeads);

  const {
    data: contactos,
    contactosLoading
  } = useQuery(["contactos"], getContactos);

  const {
    data: estados,
  } = useQuery(["estados"], getEstados);

  const opcionesLeads = leadsLoading || !leads ? [] :
    leads.map(lead => ({ value: lead.lead_id, label: `${lead.lead_id}-${lead.persona.nombre}` }));

  const opcionesContactos = contactosLoading || !contactos ? [] :
    contactos.map(contacto => ({ value: contacto.contacto_id, label: `${contacto.contacto_id}-${contacto.persona.nombre}` }));

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { usu_insercion: currentUser.nom_usuario, usu_modificacion: currentUser.nom_usuario };

    try {
      const nuevaLlamada = await createLlamada({ ...llamada, ...auditoria });

      if (nuevaLlamada.message) {
        setAction({ saving: false, error: true, message: nuevaLlamada.message });
      } else {
        setAction({ saving: false, error: false, message: "Registro de llamada creado exitosamente." });
        setTimeout(() => navigate("/actividades/llamadas"), 2000);
      }
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Registro de Llamada
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <Seccion titulo="General">
            <div className="columns is-vcentered">
              <div className="column">
                <Input
                  label="Asunto*"
                  name="asunto"
                  value={llamada?.asunto || ""}
                  onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, LLAMADA)}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <Dropdown
                  label="Tipo*"
                  options={tipos}
                  value={select.tipo}
                  onChange={e => {
                    handleDispatch(dispatch, "tipo", e?.value, LLAMADA);
                    handleDispatch(dispatch, "tipo", e, "select")
                  }}
                />
              </div>
              <div className="column">
                <Dropdown
                  label="Estado*"
                  value={select.estado}
                  options={estados}
                  onChange={e => {
                    handleDispatch(dispatch, "estado", e?.value, LLAMADA);
                    handleDispatch(dispatch, "estado", e, "select")
                  }}
                />
              </div>
            </div>
            <div className="columns is-desktop">
              <div className="column">
                <Dropdown
                  label="Lead"
                  options={opcionesLeads}
                  value={select.lead}
                  disabled={llamada?.contacto_id ? true : false}
                  onChange={e => {
                    handleDispatch(dispatch, "lead_id", e?.value, LLAMADA);
                    handleDispatch(dispatch, "lead", e, "select")
                  }}
                />
              </div>
              <div className="column">
                <Dropdown
                  label="Contacto"
                  options={opcionesContactos}
                  value={select.contacto}
                  disabled={llamada?.lead_id ? true : false}
                  onChange={e => {
                    handleDispatch(dispatch, "contacto_id", e?.value, LLAMADA);
                    handleDispatch(dispatch, "contacto", e, "select")
                  }}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <Dropdown
                  label="Usuario Asignado"
                  value={select.usu_asignado}
                  options={opcionesUsuarios}
                  onChange={e => {
                    handleDispatch(dispatch, "usu_asignado_id", e?.value, LLAMADA);
                    handleDispatch(dispatch, "usu_asignado", e, "select")
                  }}
                />
              </div>
            </div>
            <div className="columns is-desktop">
              <div className="column">
                <Datepicker
                  label="Fecha de Inicio*"
                  selected={llamada?.fec_inicio || ""}
                  onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, LLAMADA)}
                />
              </div>
              <div className="column">
                <TextArea
                  label="Descripción"
                  name="descripcion"
                  value={llamada?.descripcion || ""}
                  onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, LLAMADA)}
                />
              </div>
            </div>
          </Seccion>
          <Guardar
            saving={action.saving}
            guardar={crear}
          />
          <Volver
            navigate={navigate}
          />
        </form>
      </section>
    </div>
  )
};

export default CrearLlamada;