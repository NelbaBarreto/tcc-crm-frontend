import React, { useState } from "react";
import Seccion from "../formulario/Seccion";
import MostrarMensaje from "../formulario/MostrarMensaje";
import CrearPersona from "../personas/CrearPersona";
import { Volver, Guardar } from "../formulario/Acciones";
import { Titulo1 } from "../formulario/Titulo";

const DatosLead = ({ persona, setPersona }) => {
  return (
    <Seccion titulo="Datos del Lead">
      <div className="field">
        <label className="label">Estado</label>
        <div class="control">
          <div class="select">
            <select>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>
        </div>
      </div>

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
    </Seccion>
  );
};

const CrearLead = () => {
  const [persona, setPersona] = useState({ empleado: { usuario: {} } });
  const [state, setState] = useState(false);

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Lead
        </Titulo1>
        <form>
          <CrearPersona persona={persona} setPersona={setPersona} />
          <DatosLead persona={persona} setPersona={setPersona} />
          <Guardar saving={state.saving} />
          <Volver />
        </form>
      </section>
    </div>
  )
};

export default CrearLead;