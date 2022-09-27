import React, { useState } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";

const DatosProfesor = ({ profesor, setProfesor }) => {
  return (
    <Seccion titulo="Datos del Profesor">
      <div className="field">
        <label className="label">Nombre Completo</label>
        <div className="control">
          <input
            name="nombre"
            className="input shadow-lg"
            type="text"
            placeholder="Ingrese el nombre del profesor"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Fecha de Registro</label>
        <div className="control">
          <input
            name="fecIni"
            className="input shadow-lg"
            type="date"
          />
        </div>
      </div>

      <div className="columns is-desktop">
        <div className="column">
          <div className="field">
            <label className="label">Nivel Academico</label>
            <div className="control">
              <input
                name="nivel"
                className="input shadow-lg"
                type="email"
                placeholder="Ingrese su mail"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Codigo Curso</label>
            <div className="control">
              <input
                name="curso_id"
                className="input shadow-lg"
                type="number"
                placeholder="Ingrese el Codigo del curso"
              />
            </div>
          </div>
        </div>
      </div>

    </Seccion>
  );
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
          <DatosProfesor persona={persona} setPersona={setPersona} />
          <Guardar saving={state.saving} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearProfesor;
