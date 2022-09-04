import React from "react";

const CrearContacto = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo Contacto</h1>
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
                <label className="label">Nombre del Contacto</label>
                <div className="control">
                  <input
                    name="nomContacto"
                    className="input shadow-lg"
                    type="text"
                    placeholder="Ingrese el nombre del contacto"
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
                <label className="label">Telefono</label>
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control">
                      <a href=" " className="button is-static">
                        +595
                      </a>
                    </p>
                    <p className="control is-expanded">
                      <input
                        className="input"
                        type="tel"
                        placeholder="Ingrese su numero de telefono" />
                    </p>
                  </div>
                  <p className="help">No Ingresar cero al comienzo</p>
                </div>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Tipo Telefono</label>
                <div className="control">
                  <input
                    name="tipTelefono"
                    className="input shadow-lg"
                    type="number"
                    placeholder="Ingrese su numero de Telefono"
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

export default CrearContacto;