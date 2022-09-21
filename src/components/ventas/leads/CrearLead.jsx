import React, { useState } from "react";
import Volver from "../../Volver";
import Guardar from "../../Guardar";
import { useNavigate } from "react-router-dom";
import { createLead } from "../../../api/leads";

const CrearLead = () => {
  const [lead, setLead] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    await createLead(lead);
  };
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo Lead</h1>
        <form>

          <div class="columns is-mobile">
            <div class="column">
              <div className="field">
                <label className="label">Nombre del Lead</label>
                <div className="control">
                  <input
                    name="nomLead"
                    className="input shadow-lg"
                    type="text"
                    onChange={e => setLead({ ...lead, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Estado: </label>
                <div class="control">
                  <div class="select">
                    <select>
                      <option>Activo</option>
                      <option>Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="columns is-mobile">
            <div class="column">
              <div className="field">
                <label className="label">Telefono</label>
                <div className="control">
                  <input
                    name="nomLead"
                    className="input shadow-lg"
                    type="text"
                    onChange={e => setLead({ ...lead, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Usuario Asignado</label>
                <div className="control">
                  <input
                    name="usuAsignado"
                    className="input shadow-lg"
                    type="number"
                    onChange={e => setLead({ ...lead, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="columns is-mobile">
            <div class="column">
              <div className="field">
                <label className="label">Numero de Documento</label>
                <div className="control">
                  <input
                    name="codCaso"
                    className="input shadow-lg"
                    type="number"
                    onChange={e => setLead({ ...lead, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Tipo Documento</label>
                <div className="control">
                  <input
                    name="tipDoc"
                    className="input shadow-lg"
                    type="number"
                    onChange={e => setLead({ ...lead, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="columns is-mobile">
            <div class="column">
              <div className="field">
                <label className="label">Codigo Campaña</label>
                <div className="control">
                  <input
                    name="codCampa"
                    className="input shadow-lg"
                    type="number"
                    onChange={e => setLead({ ...lead, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Codigo Curso</label>
                <div className="control">
                  <input
                    name="codCurso"
                    className="input shadow-lg"
                    type="number"
                    onChange={e => setLead({ ...lead, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="columns is-mobile">
            <div class="column">
              <div className="field">
                <label className="label">Correo</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="email"
                    onChange={e => setLead({ ...lead, [e.target.name]: e.target.value })} />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Origen</label>
                <div className="control">
                  <input
                    name="origen"
                    className="input shadow-lg"
                    type="text"
                    onChange={e => setLead({ ...lead, [e.target.name]: e.target.value })}
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

export default CrearLead;