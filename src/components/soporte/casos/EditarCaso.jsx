import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { editCaso, getOrigenes, getPrioridades, getEstados, getTipos, getCaso } from "../../../api/casos";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CASO = "caso";

const DatosCaso = ({ caso, dispatch, manageSelect }) => {
  const {setSelect, select} = manageSelect;
  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: origenes,
    origenesLoading
  } = useQuery(["origenes"], getOrigenes);

  const {
    data: prioridades,
    prioridadesLoading
  } = useQuery(["prioridades"], getPrioridades);

  const {
    data: estados,
    estadosLoading
  } = useQuery(["estados"], getEstados);

  const {
    data: tipos,
    tiposLoading
  } = useQuery(["tipos"], getTipos);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  const opcionesOrigenes = origenesLoading || !origenes ? [] :
    origenes.map(origen => ({ value: origen, label: origen }));

  const opcionesPrioridades = prioridadesLoading || !prioridades ? [] :
    prioridades.map(prioridad => ({ value: prioridad, label: prioridad }));

  const opcionesEstados = estadosLoading || !estados ? [] :
    estados.map(estado => ({ value: estado, label: estado }));

  const opcionesTipos = tiposLoading || !tipos ? [] :
    tipos.map(tipo => ({ value: tipo, label: tipo }));

  return (
    <Seccion titulo="Datos del Caso">
      <Input
        label="Asunto"
        name="asunto"
        value={caso?.asunto || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, CASO)}
      />
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Prioridad"
            value={select.prioridad}
            options={opcionesPrioridades}
            onChange={e => {
              handleDispatch(dispatch, "prioridad", e?.value, CASO);
              setSelect({ ...select, prioridad: e })
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Estado"
            value={select.estado}
            options={opcionesEstados}
            onChange={e => {
              handleDispatch(dispatch, "estado", e?.value, CASO);
              setSelect({ ...select, estado: e })
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Tipo"
            value={select.tipo}
            options={opcionesTipos}
            onChange={e => {
              handleDispatch(dispatch, "tipo", e?.value, CASO);
              setSelect({ ...select, tipo: e })
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Origen"
            value={select?.origen}
            options={opcionesOrigenes}
            onChange={e => {
              handleDispatch(dispatch, "origen", e?.value, CASO);
              setSelect({ ...select, origen: e })
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <Dropdown
            label="Usuario Asignado"
            value={select.usu_asignado}
            options={opcionesUsuarios}
            onChange={e => {
              handleDispatch(dispatch, "usu_asignado_id", e?.value, CASO);
              setSelect({ ...select, usu_asignado: e })
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextArea
            label="Descripción"
            name="descripcion"
            value={caso?.descripcion || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, CASO)}
          />
        </div>
        <div className="column">
          <TextArea
            label="Solución"
            name="solucion"
            value={caso?.solucion || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, CASO)}
          />
        </div>
      </div>

    </Seccion>
  );
};

const EditarCaso = () => {
  const { state: { caso }, dispatch } = useContext(AppContext);
  const [select, setSelect] = useState({ estado: "", origen: "", usu_asignado: "", prioridad: "" });
  const [action, setAction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: currentCaso,
    isLoading
  } = useQuery(["caso", id], () => getCaso(id));

  useEffect(() => {
    handleStateCleared(dispatch);
    setSelect({ estado: "", origen: "", usu_asignado: "", prioridad: "" });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      handleDispatchEdit(dispatch, currentCaso, CASO);
      setSelect({ estado: { label: currentCaso.estado, value: currentCaso.estado }, 
                  origen: { label: currentCaso.origen, value: currentCaso.origen },
                  prioridad: { label: currentCaso.prioridad, value: currentCaso.prioridad },
                  tipo: { label: currentCaso.tipo, value: currentCaso.tipo },
                  usu_asignado: { label: currentCaso.usuario?.nom_usuario, value: currentCaso.usuario?.usuario_id }});
    }
  }, [isLoading]);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await editCaso(caso.caso_id, { ...caso });
      setAction({ saving: false, error: false, message: "Caso editado exitosamente." });
      setTimeout(() => navigate("/soporte/casos"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Editar Caso
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosCaso caso={caso} dispatch={dispatch} manageSelect={{ setSelect, select }} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarCaso;