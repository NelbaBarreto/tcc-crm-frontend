import React, { useState, useReducer } from "react";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import Seccion from "../../formulario/Seccion";
import { getTipos, getEstados, createLlamada } from "../../../api/llamadas";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { reducer, handleDispatch } from "../../formulario/reducerFormularios";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea, Datepicker } from "../../formulario/Componentes";
//import TimeInput from "react-input-time";

const LLAMADA = "llamada";

const CrearLlamada = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [select, setSelect] = useState({ tipo: "", estado: "" });
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createLlamada({ ...state.llamada });
      setAction({ saving: false, error: false, message: "Registro de llamada creado exitosamente." });
      setTimeout(() => navigate("/actividades/llamadas"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  const {
    data: tipos,
    tiposLoading
  } = useQuery(["tipos"], getTipos);

  const {
    data: estados,
    estadosLoading
  } = useQuery(["estados"], getEstados);

  const opcionesTipos = tiposLoading || !tipos ? [] :
    tipos.map(tipo => ({ value: tipo, label: tipo }));

  const opcionesEstados = estadosLoading || !estados ? [] :
    estados.map(estado => ({ value: estado, label: estado }));

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Registro de Llamada
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <Seccion titulo="General">
            <div className="columns is-vcentered">
              <div className="column">
                <Input
                  label="Asunto"
                  name="asunto"
                  value={state?.llamada?.asunto || ""}
                  onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, LLAMADA)}
                />
              </div>
              <div className="column is-2">
                <Dropdown
                  label="Tipo"
                  options={opcionesTipos}
                  value={select.tipo}
                  onChange={e => {
                    handleDispatch(dispatch, "tipo", e?.value, LLAMADA);
                    setSelect({ ...select, tipo: e })
                  }}
                />
              </div>
              <div className="column is-3">
                <Dropdown
                  label="Estado"
                  value={select.estado}
                  options={opcionesEstados}
                  onChange={e => {
                    handleDispatch(dispatch, "estado", e?.value, LLAMADA);
                    setSelect({ ...select, estado: e })
                  }}
                />
              </div>
            </div>
            <div className="columns is-desktop">
              <div className="column">
                <Datepicker
                  label="Fecha de Inicio"
                  selected={state.llamada?.fec_inicio || ""}
                  onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, LLAMADA)}
                />
              </div>
              <div className="column">
                <TextArea
                  label=" Descripción"
                  name="descripcion"
                  value={state?.llamada?.descripcion || ""}
                  onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, LLAMADA)}
                />
              </div>
            </div>
          </Seccion>
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearLlamada;