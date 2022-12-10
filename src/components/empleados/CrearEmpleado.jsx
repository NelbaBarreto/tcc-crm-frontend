import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../utils/AppContext";
import Seccion from "../formulario/Seccion";
import MostrarMensaje from "../formulario/MostrarMensaje";
import CrearPersona from "../personas/CrearPersona";
import { Volver, Guardar } from "../formulario/Acciones";
import { Titulo1 } from "../formulario/Titulo";
import { Checkbox } from "../formulario/Componentes";
import { createEmpleado } from "../../api/empleados";
import { handleDispatch, handleStateCleared } from "../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";

const EMPLEADO = "empleado";

const DatosEmpleado = ({ empleado, dispatch }) => {
  return (
    <Seccion titulo="Datos del Empleado">
      <Checkbox
        label="Activo"
        name="activo"
        value={empleado?.activo || false}
        onChange={e => handleDispatch(dispatch, e.target.name, e?.target.checked, EMPLEADO)}
      />
    </Seccion>
  );
};

const CrearLead = () => {
  const { state: { empleado, persona, direcciones }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createEmpleado({ ...empleado, persona: { ...persona, direcciones } });
      setAction({ saving: false, error: false, message: "Empleado creado exitosamente." });
      setTimeout(() => navigate("/admin/empleados"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Empleado
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <CrearPersona />
          <DatosEmpleado
            empleado={empleado}
            dispatch={dispatch}
          />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearLead;