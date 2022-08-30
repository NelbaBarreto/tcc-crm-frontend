import React from "react";

const CrearCampana = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nueva Campaña</h1>
        <form>
          <div className="field">
            <label className="label">Nombre de la Campaña</label>
            <div className="control">
              <input
                name="nomCampa"
                className="input shadow-lg"
                type="text"
                placeholder="Ingrese el nombre de la campaña"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Tipo Campaña</label>
            <div className="control">
              <input
                name="codCaso"
                className="input shadow-lg"
                type="number"
                placeholder="Ingrese el Tipo Campaña"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Fecha Inicio</label>
            <div className="control">
              <input
                name="fecIni"
                className="input shadow-lg"
                type="date"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Fecha Fin</label>
            <div className="control">
              <input
                name="fecFin"
                className="input shadow-lg"
                type="date"
              />
            </div>
          </div>

          <div className="field mt-3">
            <div className="control">
              <button
                className="button float-right font-semibold shadow-lg text-white hover:text-white hover:bg-lila-700 bg-lila-400 border-lila-700"
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

export default CrearCampana;