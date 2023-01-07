import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import useToken from "../../../utils/useToken";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown } from "../../formulario/Componentes";
import { getCampanas } from "../../../api/campanas";
import { createContacto, getOrigenes } from "../../../api/contactos";
import { getOrganizaciones } from "../../../api/organizaciones";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const CONTACTO = "contacto";

const DatosContacto = ({ dispatch }) => {
  const [select, setSelect] = useState({ origen: "", campana: "" });

  const {
    data: campanas,
    campanasLoading
  } = useQuery(["campanas"], getCampanas);

  const {
    data: origenesContactos,
    origenesLoading
  } = useQuery(["origenesContactos"], getOrigenes);

  const {
    data: organizaciones,
    organizacionesLoading
  } = useQuery(["organizaciones"], getOrganizaciones);

  const opcionesCampanas = campanasLoading || !campanas ? [] :
    campanas.map(campana => ({ value: campana.campana_id, label: campana.nombre }));

  const opcionesOrigen = origenesLoading || !origenesContactos ? [] :
    origenesContactos.map(origen => ({ value: origen, label: origen }));

  const opcionesOrganizaciones = organizacionesLoading || !organizaciones ? [] :
    organizaciones.map(organizacion => ({ value: organizacion.organizacion_id, label: organizacion?.persona.nombre }));

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
              setSelect({ ...select, organizacion: e })
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Campaña"
            value={select.campana}
            options={opcionesCampanas}
            onChange={e => {
              handleDispatch(dispatch, "campana_id", e?.value, CONTACTO);
              setSelect({ ...select, campana: e })
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Origen del Lead"
            value={select.origen}
            options={opcionesOrigen}
            onChange={e => {
              handleDispatch(dispatch, "origen", e?.value, CONTACTO);
              setSelect({ ...select, origen: e })
            }}
          />
        </div>
      </div>
    </Seccion>
  );
};

const CrearContacto = () => {
  const { state: { contacto, persona, direcciones }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { usu_insercion: currentUser.nom_usuario, usu_modificacion: currentUser.nom_usuario };
    
    try {
      await createContacto({ ...contacto,
        ...auditoria,
        persona: {...persona, direcciones, ...auditoria } });
      setAction({ saving: false, error: false, message: "Contacto creado exitosamente." });
      setTimeout(() => navigate("/ventas/contactos"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Contacto
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <CrearPersona />
          <DatosContacto
            contacto={contacto}
            dispatch={dispatch}
          />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearContacto;