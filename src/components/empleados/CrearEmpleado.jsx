import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../utils/AppContext";
import Seccion from "../formulario/Seccion";
import MostrarMensaje from "../formulario/MostrarMensaje";
import CrearPersona from "../personas/CrearPersona";
import useToken from "../../utils/useToken";
import { Volver, Guardar } from "../formulario/Acciones";
import { Titulo1 } from "../formulario/Titulo";
import { Checkbox, Input } from "../formulario/Componentes";
import { createEmpleado } from "../../api/empleados";
import { handleDispatch, handleStateCleared } from "../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";

const EMPLEADO = "empleado";
const USUARIO = "usuario";

const DatosEmpleado = ({ empleado, dispatch }) => {
  return (
    <Seccion titulo="Datos del Empleado">
      <div className="columns">
        <div className="column">
          <Input
            label="Cargo"
            name="cargo"
            value={empleado?.cargo || ""}
            onChange={e => handleDispatch(dispatch, e.target.name, e?.target.value, EMPLEADO)}
          />
        </div>
        <div className="column">
          <Checkbox
            label="Activo"
            name="activo"
            value={empleado?.activo || false}
            onChange={e => handleDispatch(dispatch, e.target.name, e?.target.checked, EMPLEADO)}
          />
        </div>
      </div>
    </Seccion>
  );
};

const DatosUsuario = ({ usuario, dispatch }) => {
  return (
    <Seccion titulo="Datos del Usuario">
      <div className="columns">
        <div className="column is-half">
          <Input
            label="Nombre de Usuario"
            name="nom_usuario"
            value={usuario?.nom_usuario || ""}
            onChange={e => handleDispatch(dispatch, e.target.name, e?.target.value, USUARIO)}
          />
        </div>
      </div>
    </Seccion>
  );
};

const CrearLead = () => {
  const { state: { empleado, 
                   usuario, 
                   persona, 
                   direcciones, 
                   telefonos 
                  }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const currentUser = useToken().usuario;
  const navigate = useNavigate();

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { usu_insercion: currentUser.nom_usuario, usu_modificacion: currentUser.nom_usuario };
    
    try {
      await createEmpleado({...empleado,
        persona: { ...persona, direcciones, telefonos, ...auditoria },
        usuario: { ...usuario, email: persona.email, ...auditoria },
        ...auditoria
      });
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
          <DatosUsuario 
            usuario={usuario}
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