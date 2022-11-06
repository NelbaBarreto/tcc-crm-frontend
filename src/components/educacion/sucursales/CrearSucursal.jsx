import React, { useState } from "react";
import Seccion from "../../formulario/Seccion";
import Direccion from "../../personas/Direccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";
import { createSucursal } from "../../../api/sucursales";

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
  const [action, setAction] = useState({});
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createSucursal(state.sucursal);
      setAction({ saving: false, error: false, message: "Profesor registrado exitosamente." });
      setTimeout(() => navigate("/educacion/profesores"), 3000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Sucursal
        </Titulo1>
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <DatosSucursal sucursal={sucursal} setSucursal={setSucursal} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearSucursal;