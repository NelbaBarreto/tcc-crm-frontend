import React, { useState } from "react";
import Seccion from "../../formulario/Seccion";
import Direccion from "../../personas/Direccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";

const DatosSucursal = ({ sucursal, setSucursal }) => {
  return (
    <Seccion titulo="Datos de la Sucursal">
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
          <Direccion index={0} />
        </div>
      </div>
    </Seccion>
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