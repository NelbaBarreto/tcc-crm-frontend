import React from "react";

const CrearCurso = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo Curso</h1>
        <form>

          <div className="columns is-mobile">
            <div className="column">
              <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                  <input
                    name="nombre"
                    className="input shadow-lg"
                    type="text"
                    placeholder="Ingrese el nombre del curso"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Profesor </label>
                <div className="control">
                  <input
                    name="profesor_id"
                    className="input shadow-lg"
                    type="number"
                    placeholder="Ingrese el codigo del profesor"
                  />
                </div>
              </div>
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
                    placeholder="Ingrese el codigo de la sucursal"
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

export default CrearCurso;