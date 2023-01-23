import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import Direccion from "../../personas/Direccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import useToken from "../../../utils/useToken";
import { Input } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { createSede } from "../../../api/sedes";

const SEDE = "sede";

const DatosSede = ({ sede, dispatch }) => {
  return (
    <Seccion titulo="Datos de la Sede">
      <Input
        name="nombre"
        label="Nombre"
        value={sede?.nombre || ""}
        onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, SEDE)}
      />
      <div className="field">
        <label className="label">Dirección</label>
        <Direccion />
      </div>
    </Seccion>
  );
};

const CrearSede = () => {
  const { state: { sede, 
    direccion 
  }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      const auditoria = { usu_insercion: currentUser.nom_usuario, usu_modificacion: currentUser.nom_usuario };
      await createSede({...sede, ...auditoria, direccion: { ...direccion, ...auditoria } });
      setAction({ saving: false, error: false, message: "Sede registrada exitosamente." });
      setTimeout(() => navigate("/educacion/sedes"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Sede
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosSede sede={sede} dispatch={dispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearSede;