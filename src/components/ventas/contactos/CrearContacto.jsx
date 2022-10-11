import React, { useState, useReducer } from "react";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { createContacto } from "../../../api/contactos";
import { reducer } from "../../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";

const CrearContacto = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [persona, setPersona] = useState({});
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createContacto({ ...state.lead, persona });
      setAction({ saving: false, error: false, message: "Contacto creado exitosamente." });
      setTimeout(() => navigate("/ventas/contactos"), 3000);
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
          <CrearPersona persona={persona} setPersona={setPersona} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearContacto;