import React, { useState } from "react";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";

const DatosProfesor = () => {
  return null;
};

const CrearProfesor = () => {
  const [persona, setPersona] = useState({ empleado: { usuario: {} } });
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Profesor
        </Titulo1>
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <CrearPersona persona={persona} setPersona={setPersona} />
          <DatosProfesor />
          <Guardar saving={state.saving} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearProfesor;
