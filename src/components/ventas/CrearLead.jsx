import React from "react";

const CrearLead = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo Lead</h1>
        <form>

          <div class="columns is-mobile">
            <div class="column">
              <div className="field">
                <label className="label">Codigo Persona</label>
                <div className="control">
                  <input
                    name="codPersona"
                    className="input shadow-lg"
                    type="number"
                    placeholder="Ingrese el codigo de persona"
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
                <label className="label">Nombre del Lead</label>
                <div className="control">
                  <input
                    name="nomLead"
                    className="input shadow-lg"
                    type="text"
                    placeholder="Ingrese el nombre del lead"
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
                    placeholder="Ingrese el codigo del usuario asignado"
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
                    placeholder="Ingrese su numero de documento"
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
                    placeholder="Ingrese el Tipo de documento"
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
                    placeholder="Ingrese el codigo de campaña"
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
                    placeholder="Ingrese el Codigo del curso"
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
                  <input class="input" type="email" placeholder="Email" />
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
                    placeholder="Ingrese el Origen del Lead"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="field mt-3">
            <div className="control">
              <button
                className="button float-right font-semibold shadow-lg text-white hover:text-white focus:text-white
                 hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
};

export default CrearLead;