import React from "react";

const CrearOportunidad = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nueva Oportunidad</h1>
        <form>

          <div className="columns is-mobile">
            <div className="column">
              <div className="field">
                <label className="label">Nombre de la Oportunidad</label>
                <div className="control">
                  <input
                    name="nomOportu"
                    className="input shadow-lg"
                    type="text"
                    placeholder="Ingrese el nombre de la oportunidad"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Etapa: </label>
                <div className="control">
                  <div className="select">
                    <select>
                      <option>Pendiente</option>
                      <option>Confirmado</option>
                      <option>Anulado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="columns is-mobile">
            <div className="column">
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
            <div className="column">
              <div className="field">
                <label className="label">Valor Oportunidad</label>
                <div className="control">
                  <input
                    name="valOportu"
                    className="input shadow-lg"
                    type="number"
                    placeholder="Ingrese el valor de la oportunidad"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="columns is-mobile">
            <div className="column">
              <div className="field">
                <label className="label">Codigo Campaña</label>
                <div className="control">
                  <input
                    name="usuAsignado"
                    className="input shadow-lg"
                    type="number"
                    placeholder="Ingrese el codigo de la campaña"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Descripción de la Oportunidad</label>
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

export default CrearOportunidad;