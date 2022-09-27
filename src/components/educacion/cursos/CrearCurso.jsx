import React, { useState } from "react";
import { Volver, Guardar } from "../../formulario/Acciones";
import { useNavigate } from "react-router-dom";
import { createCurso } from "../../../api/cursos";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import { Titulo1 } from "../../formulario/Titulo";

const DatosCurso = ({ curso, setCurso }) => {
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    await createCurso(curso);
  };
  return (
    <Seccion titulo="Datos del Curso">
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control">
          <input
            name="nombre"
            className="input shadow-lg"
            type="text"
            onChange={e => setCurso({ ...curso, [e.target.name]: e.target.value })}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Profesor </label>
        <div className="control">
          <input
            name="profesor_id"
            className="input shadow-lg"
            type="number"
            onChange={e => setCurso({ ...curso, [e.target.name]: e.target.value })}
          />
        </div>
      </div>

      <div className="columns is-mobile">
        <div className="column">
          <div className="field">
            <label className="label">Fecha Inicio</label>
            <div className="control">
              <input
                name="fec_ini_curso"
                className="input shadow-lg"
                type="date"
                onChange={e => setCurso({ ...curso, [e.target.name]: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Fecha Fin</label>
            <div className="control">
              <input
                name="fec_fin_curso"
                className="input shadow-lg"
                type="date"
                onChange={e => setCurso({ ...curso, [e.target.name]: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="columns is-mobile">
        <div className="column">
          <div className="field">
            <label className="label">Horario </label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Mañana</option>
                  <option>Tarde</option>
                  <option>Noche</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Sucursal</label>
            <div className="control">
              <input
                name="sucursal_id"
                className="input shadow-lg"
                type="number"
                onChange={e => setCurso({ ...curso, [e.target.name]: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

    </Seccion>
  );
};

const CrearCurso = () => {
  const [curso, setCurso] = useState();
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Curso
        </Titulo1>
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <DatosCurso curso={curso} setCurso={setCurso} />
          <Guardar saving={state.saving} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearCurso;