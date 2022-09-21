import React, { useState } from "react";
import Volver from "../../Volver";
import Guardar from "../../Guardar";
import { useNavigate } from "react-router-dom";
import { createCurso } from "../../../api/cursos";

const CrearCurso = () => {
  const [curso, setCurso] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    await createCurso(curso);
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo Curso</h1>
        <form>

          <div class="columns is-mobile">
            <div class="column">
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
            </div>
            <div class="column">
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
            </div>
          </div>

          <div class="columns is-mobile">
            <div class="column">
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
            <div class="column">
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

          <div class="columns is-mobile">
            <div class="column">
              <div className="field">
                <label className="label">Horario </label>
                <div class="control">
                  <div class="select">
                    <select>
                      <option>Mañana</option>
                      <option>Tarde</option>
                      <option>Noche</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
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
          <Guardar guardar={crear} />
        </form>
        <Volver navigate={navigate} />
      </section>
    </div>
  )
};

export default CrearCurso;