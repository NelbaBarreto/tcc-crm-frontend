import React, { useState } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";

const DatosLead = ({ persona, setPersona }) => {
  return (
    <Seccion titulo="Datos del Lead">
      <div className="field">
        <label className="label">Estado</label>
        <div className="control">
          <div className="select">
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
      <div className="columns is-mobile">
        <div className="column">
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
        <div className="column">
          <div className="field">
            <label className="label">Interés</label>
            <div className="control">
              <input
                name="curso_id"
                className="input shadow-lg"
                type="number"
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
  const navigate = useNavigate();

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Lead
        </Titulo1>
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <CrearPersona persona={persona} setPersona={setPersona} />
          <DatosLead persona={persona} setPersona={setPersona} />
          <Guardar saving={state.saving} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearLead;