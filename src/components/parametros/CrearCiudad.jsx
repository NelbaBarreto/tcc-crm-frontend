import React from "react";

const CrearCiudad = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nueva Ciudad</h1>
        <form>
          <div className="field">
            <label className="label">Nombre de la ciudad</label>
            <div className="control">
              <input
                name="nombre"
                className="input shadow-lg"
                type="text"
                placeholder="Ingrese el nombre de su ciudad"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Codigo país</label>
            <div className="control">
              <input
                name="codPais"
                className="input shadow-lg"
                type="number"
                placeholder="Ingrese su codigo de país"
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

export default CrearCiudad;