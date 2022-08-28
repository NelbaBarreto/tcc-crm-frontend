import React from "react";

const CrearPais = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo País</h1>
        <form>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                name="nombre"
                className="input shadow-lg"
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Descripción</label>
            <div className="control">
              <input
                name="descripcion"
                className="input shadow-lg"
                type="text"
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

export default CrearPais;