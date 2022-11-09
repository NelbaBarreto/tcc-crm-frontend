import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea, Datepicker } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { createTarea, getPrioridades, getEstados } from "../../../api/tareas";
import { reducer, handleDispatch } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const TAREA = "tarea";

const DatosTarea = ({ tarea, dispatch }) => {
  const [select, setSelect] = useState({ estado: "", prioridad: "" });

  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: prioridades,
    prioridadesLoading
  } = useQuery(["prioridades"], getPrioridades);

  const {
    data: estados,
    estadosLoading
  } = useQuery(["estados"], getEstados);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  const opcionesPrioridades = prioridadesLoading || !prioridades ? [] :
    prioridades.map(prioridad => ({ value: prioridad, label: prioridad }));

  const opcionesEstados = estadosLoading || !estados ? [] :
    estados.map(estado => ({ value: estado, label: estado }));

  return (
    <Seccion titulo="Datos de la Tarea">
      <div className="columns is-desktop">
        <div className="column">
          <Input
            label="Asunto"
            name="asunto"
            value={tarea?.asunto || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TAREA)}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Estado"
            value={select.estado}
            options={opcionesEstados}
            onChange={e => {
              handleDispatch(dispatch, "estado", e?.value, TAREA);
              setSelect({ ...select, estado: e })
            }}
          />
        </div>
      </div>

      <div className="columns is-desktop">
        <div className="column">
          <Dropdown
            label="Usuario Asignado"
            value={select.usu_asignado}
            options={opcionesUsuarios}
            onChange={e => {
              handleDispatch(dispatch, "usu_asignado_id", e?.value, TAREA);
              setSelect({ ...select, usu_asignado: e })
            }}
          />
        </div>

        <div className="column">
          <Dropdown
            label="Prioridad"
            value={select.prioridad}
            options={opcionesPrioridades}
            onChange={e => {
              handleDispatch(dispatch, "prioridad", e?.value, TAREA);
              setSelect({ ...select, prioridad: e })
            }}
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <Datepicker
            label="Fecha de Inicio"
            selected={tarea?.fec_inicio || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, TAREA)}
          />
        </div>
        <div className="column">
            <Datepicker
              label="Fecha Fin"
              selected={tarea?.fec_fin || ""}
              onChange={fecha => handleDispatch(dispatch, "fec_fin", fecha, TAREA)}
            />
        </div>
      </div>
        <TextArea
          label="Descripción"
          name="descripcion"
          value={tarea?.descripcion || ""}
          onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TAREA)}
        />
    </Seccion >
  );
};

const CrearTarea = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createTarea({ ...state.tarea });
      setAction({ saving: false, error: false, message: "Tarea creada exitosamente." });
      setTimeout(() => navigate("/actividades/tareas"), 3000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Tarea
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosTarea tarea={state.tarea} dispatch={dispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearTarea;