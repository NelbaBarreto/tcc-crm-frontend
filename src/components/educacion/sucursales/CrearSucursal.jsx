import React, { useState, useContext } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import Direccion from "../../personas/Direccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Input } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { createSucursal } from "../../../api/sucursales";

const SUCURSAL = "sucursal";

const CrearSucursal = () => {
  const { state: { sucursal, 
    direccion 
  }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();
  
  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createSucursal({...sucursal, direccion});
      setAction({ saving: false, error: false, message: "Sede registrada exitosamente." });
      handleStateCleared(dispatch);
      setTimeout(() => navigate("/educacion/sucursales"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  const DatosSede = ({ sede, dispatch }) => {
    return (
      <Seccion titulo="Datos de la Sede">
        <Input
          name="nombre"
          label="Nombre"
          value={sede?.nombre || ""}
          onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, SUCURSAL)}
        />
        <div className="field">
          <label className="label">Dirección</label>
          <Direccion index={0} />
        </div>
      </Seccion>
    );
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Sede
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosSede sede={sucursal} dispatch={dispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearSucursal;