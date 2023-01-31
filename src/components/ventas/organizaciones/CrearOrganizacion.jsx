import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import useToken from "../../../utils/useToken";
import { Input, TextArea } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { createOrganizacion } from "../../../api/organizaciones";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";

const ORGANIZACION = "organizacion";

const DatosOrganizacion = ({ organizacion, dispatch }) => {
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

const CrearLead = () => {
  const { state: { organizacion, persona, direcciones }, dispatch } = useContext(AppContext);
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
      await createOrganizacion({
        ...organizacion,
        ...auditoria,
        persona: { ...persona, direcciones, ...auditoria }
      });
      setAction({ saving: false, error: false, message: "Organización creada exitosamente." });
      setTimeout(() => navigate("/ventas/organizaciones"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Organización
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <CrearPersona />
          <DatosOrganizacion
            organizacion={organizacion}
            dispatch={dispatch}
          />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearLead;