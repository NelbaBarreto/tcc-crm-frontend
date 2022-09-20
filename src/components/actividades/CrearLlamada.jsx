import React, { useState } from "react";
import MostrarMensaje from "../formulario/MostrarMensaje";
import Seccion from "../formulario/Seccion";
import DatePicker from "react-datepicker";
import { Volver, Guardar } from "../formulario/Acciones";
import { Titulo1 } from "../formulario/Titulo";
//import TimeInput from "react-input-time";

const CrearLlamada = () => {
  const [state, setState] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Registro de Llamada
        </Titulo1>
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <Seccion titulo="General">
            <div class="columns">
              <div class="column">
                <div className="field">
                  <label className="label">Asunto</label>
                  <div className="control">
                    <input
                      name="asunto"
                      className="input shadow-lg"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div class="column">
                <div className="field">
                  <label className="label">Estado</label>
                  <div className="columns">
                    <div class="column">
                      <div class="control">
                        <div class="select">
                          <select>
                            <option selected>Entrante</option>
                            <option>Saliente</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="control">
                        <div class="select">
                          <select>
                            <option>Ocupado</option>
                            <option>Conectado</option>
                            <option>Dejo un mensaje</option>
                            <option>Sin respuesta</option>
                            <option>Nro Incorrecto</option>
                            <option>Proxima llamada</option>
                            <option>Oportunidad Cerrada</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column">
                <div className="field">
                  <label className="label">Fecha y Hora de Inicio</label>
                  <DatePicker
                    className="input"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    locale="pt-BR"
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={15}
                    dateFormat="Pp"
                  />
                </div>
              </div>
              <div class="column">
                <div className="field">
                  <label className="label">Descripción de la llamada</label>
                  <div className="control">
                    <textarea
                      name="desCaso"
                      className="textarea"
                      type="text"
                      placeholder="Ingrese una descripción"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Seccion>
          <Guardar saving={state.saving} />
          <Volver />
        </form>
      </section>
    </div>
  )
};

export default CrearLlamada;