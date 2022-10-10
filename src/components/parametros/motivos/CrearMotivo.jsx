import React from "react";

const CrearMotivo = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo Motivo</h1>
        <form>
          <div className="field">
            <label className="label">Motivo del Caso</label>
            <div className="control">
              <input
                name="motCaso"
                className="input shadow-lg"
                type="text"
                placeholder="Ingrese el motivo del caso"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Codigo del Caso</label>
            <div className="control">
              <input
                name="codCaso"
                className="input shadow-lg"
                type="number"
                placeholder="Ingrese el codigo del caso"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Descripción del Caso</label>
            <div className="control">
              <textarea
                name="desCaso"
                className="textarea"
                type="text"
                placeholder="Ingrese una descripción"
              />
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

export default CrearMotivo;