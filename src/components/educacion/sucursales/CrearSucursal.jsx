import React, { useState } from "react";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";

const DatosSucursal = ({ sucursal, setSucursal }) => {
  return (
    <div>
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

      <div className="columns is-desktop">
        <div className="column">
          <div className="field">
            <label className="label">Tipo Telefono</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Linea fija</option>
                  <option>Movil</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
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
      
    </div>

  );
};

const CrearSucursal = () => {
  const [sucursal, setSucursal] = useState({ empleado: { usuario: {} } });
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Sucursal
        </Titulo1>
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <DatosSucursal sucursal={sucursal} setSucursal={setSucursal} />
          <Guardar saving={state.saving} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearSucursal;