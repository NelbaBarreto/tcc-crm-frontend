import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import { Titulo1 } from "../../formulario/Titulo";
import { Input, Dropdown } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { reducer, handleDispatch } from "../../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";
import { createProfesor } from "../../../api/profesores";

const PROFESOR = "profesor";


const CrearProfesor = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [action, setAction] = useState({});
  const navigate = useNavigate();
  const [persona, setPersona] = useState({ empleado: { usuario: {} } });
  

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createProfesor(state.personas?.persona_id);
      setAction({ saving: false, error: false, message: "Profesor registrado exitosamente." });
      setTimeout(() => navigate("/educacion/profesores"), 3000);
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
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <CrearPersona persona={persona} setPersona={setPersona} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearProfesor;