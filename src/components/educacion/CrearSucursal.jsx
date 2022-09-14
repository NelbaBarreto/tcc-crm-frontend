import React from "react";

const CrearSucursal = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nueva Sucursal</h1>
        <form>

          <div class="columns is-desktop">
            <div class="column">
              <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                  <input
                    name="nombre"
                    className="input shadow-lg"
                    type="text"
                    placeholder="Ingrese el nombre de la sucursal"
                  />
                </div>
              </div>
            </div>
            <div class="column">
            <div className="field">
                <label className="label">Dirección</label>
                <div className="control">
                  <input
                    name="direccion_id"
                    className="input shadow-lg"
                    type="text"
                    placeholder="Ingrese la direccion de la sucursal"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="columns is-desktop">
            <div class="column">
            <div className="field">
                <label className="label">Tipo Telefono</label>
                <div class="control">
                  <div class="select">
                    <select>
                      <option>Linea fija</option>
                      <option>Movil</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Numero de Telefono</label>
                <div className="control">
                  <input
                    name="numero"
                    className="input shadow-lg"
                    type="number"
                    placeholder="Ingrese el numero de telefono"
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

export default CrearSucursal;