import React from "react";

const CrearProfesor = () => {
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo Profesor</h1>
        <form>

          <div class="columns is-desktop">
            <div class="column">
              <div className="field">
                <label className="label">Nombre Completo</label>
                <div className="control">
                  <input
                    name="nombre"
                    className="input shadow-lg"
                    type="text"
                    placeholder="Ingrese el nombre del profesor"
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Fecha de Registro</label>
                <div className="control">
                  <input
                    name="fecIni"
                    className="input shadow-lg"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="columns is-mobile">
            <div class="column">
              <div className="field">
                <label className="label">Tipo Documento</label>
                <div class="control">
                  <div class="select">
                    <select>
                      <option>Cedula de Indetidad Paraguaya</option>
                      <option>Registro Unico de Contribuyente</option>
                      <option>Tarjeta Diplomatica</option>
                      <option>Cedula de Indentidad Extranjera</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
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
          </div>



          <div class="columns is-mobile">
            <div class="column">
              <div className="field">
                <label className="label">Correo</label>
                <div className="control">
                  <input
                    name="nombre"
                    className="input shadow-lg"
                    type="email"
                    placeholder="Ingrese su mail"
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div className="field">
                <label className="label">Codigo Curso</label>
                <div className="control">
                  <input
                    name="curso_id"
                    className="input shadow-lg"
                    type="number"
                    placeholder="Ingrese el Codigo del curso"
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
                      <option>Movil</option>
                      <option>Familiar</option>
                      <option>Laboral</option>
                      <option>Otro</option>
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

export default CrearProfesor;