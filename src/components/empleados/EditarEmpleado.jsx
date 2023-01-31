import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../utils/AppContext";
import Seccion from "../formulario/Seccion";
import MostrarMensaje from "../formulario/MostrarMensaje";
import EditarPersona from "../personas/EditarPersona";
import useToken from "../../utils/useToken";
import { Volver, Guardar } from "../formulario/Acciones";
import { Input, Checkbox } from "../formulario/Componentes";
import { Titulo1 } from "../formulario/Titulo";
import { editEmpleado, getEmpleado } from "../../api/empleados";
import { handleDispatch, handleStateCleared, handleDispatchEdit } from "../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const EMPLEADO = "empleado";
const USUARIO = "usuario";

const DatosEmpleado = ({ empleado, dispatch }) => {
  return (
    <Seccion titulo="Datos del Empleado">
      <div className="columns">
        <div className="column">
          <Input
            label="Cargo*"
            name="cargo"
            value={empleado?.cargo || ""}
            onChange={e => handleDispatch(dispatch, e.target.name, e?.target.value, EMPLEADO)}
          />
        </div>
        <div className="column">
          <Checkbox
            label="Activo*"
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
            label="Nombre de Usuario*"
            name="nom_usuario"
            value={usuario?.nom_usuario || ""}
            onChange={e => handleDispatch(dispatch, e.target.name, e?.target.value, USUARIO)}
          />
        </div>
      </div>
    </Seccion>
  );
};

const EditarCaso = () => {
  const { state: { lead, persona, direcciones, usuario, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const [enabled, setEnabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  const {
    data: currentEmpleado,
    isFetching,
  } = useQuery(["lead", id], () => getEmpleado(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching && enabled) {
      setEnabled(false);
      handleDispatchEdit(dispatch, currentEmpleado, EMPLEADO);
      handleDispatchEdit(dispatch, currentEmpleado.persona, "persona");
      handleDispatchEdit(dispatch, currentEmpleado.persona.telefonos, "telefonos");
      handleDispatchEdit(dispatch, currentEmpleado.persona.direcciones, "direcciones");
      handleDispatchEdit(dispatch, {
        tip_documento: { label: currentEmpleado.persona?.tip_documento, value: currentEmpleado.persona?.tip_documento },
      }, "select");
    }
  }, [isFetching]);

  const editar = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };
    
    try {
      await editEmpleado(id, {
        ...lead,
        ...auditoria,
        persona: { ...persona, direcciones, ...auditoria }
      });
      setAction({ saving: false, error: false, message: "Lead editado exitosamente." });
      setTimeout(() => navigate("/admin/empleados"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Lead
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <EditarPersona />
          <DatosEmpleado
            lead={lead}
            select={select}
            dispatch={dispatch}
          />
          <DatosUsuario 
            usuario={usuario}
            dispatch={dispatch}
          />          
          <Guardar
            saving={action.saving}
            guardar={editar}
          />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarCaso;