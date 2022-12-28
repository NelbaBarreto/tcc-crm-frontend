import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { CircularProgress } from "@mui/material";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { getTipos, getEstados, editLlamadas, getLlamada, deleLlamadas } from "../../../api/llamadas";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown, Input, TextArea, Datepicker } from "../../formulario/Componentes";


const LLAMADA = "llamada";

const DatosLlamada = ({ llamada, dispatch, manageSelect }) => {
  const { setSelect, select } = manageSelect;

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
    <Seccion titulo="Datos de la Llamada">
      <Input
        label="Asunto"
        name="asunto"
        value={llamada?.asunto || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, LLAMADA)}
      />

        <Dropdown
          label="Tipo"
          options={opcionesTipos}
          value={select.tipo}
          onChange={e => {
            handleDispatch(dispatch, "tipo", e?.value, LLAMADA);
            setSelect({ ...select, tipo: e })
          }}
        />
        <Dropdown
          label="Estado"
          value={select.estado}
          options={opcionesEstados}
          onChange={e => {
            handleDispatch(dispatch, "estado", e?.value, LLAMADA);
            setSelect({ ...select, estado: e })
          }}
        />

      {/* <div className="columns is-desktop"> */}
      {/* <div className="column">
                    <Datepicker
                        label="Fecha de Inicio"
                        selected={llamada?.fec_inicio || ""}
                        onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, LLAMADA)}
                    />
                </div> */}
      <TextArea
        label=" Descripción"
        name="descripcion"
        value={llamada?.descripcion || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, LLAMADA)}
      />
    </Seccion >

  )
};

const EditarLlamada = () => {
  const { state: { llamada }, dispatch } = useContext(AppContext);
  const [select, setSelect] = useState({ estado: "", tipo: "" });
  const [action, setAction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: currentLlamada,
    isFetching,
  } = useQuery(["llamada", id], () => getLlamada(id));

  useEffect(() => {
    handleStateCleared(dispatch);
    setSelect({ estado: "", tipo: "" });
  }, []);

  useEffect(() => {
    if (!isFetching) {
      handleDispatchEdit(dispatch, currentLlamada, LLAMADA);
      setSelect({
        estado: { label: currentLlamada.estado, value: currentLlamada.estado },
        tipo: { label: currentLlamada.tipo, value: currentLlamada.tipo },
      });
    }
  }, [isFetching]);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await editLlamadas(llamada.llamada_id, { ...llamada });
      setAction({ saving: false, error: false, message: "Llamada editada exitosamente." });
      setTimeout(() => navigate("/actividades/llamadas"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      {isFetching ?
        <CircularProgress size={24} /> : <section className="section w-full m-auto">
          <Titulo1>
            Editar Llamada
          </Titulo1>
          {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
          <form>
            <DatosLlamada llamada={llamada} dispatch={dispatch} manageSelect={{ setSelect, select }} />
            <Guardar saving={action.saving} guardar={crear} />
            <Volver navigate={navigate} />
          </form>
        </section>}
    </div>
  )

};

// const EliminarLlamada = () => {
//   const { state: { llamada }, dispatch } = useContext(AppContext);
//   const [select, setSelect] = useState({ estado: "", tipo: "" });
//   const [action, setAction] = useState({});
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const {
//     data: currentLlamada,
//     isFetching,
//   } = useQuery(["llamada", id], () => getLlamada(id));

//   useEffect(() => {
//     handleStateCleared(dispatch);
//     setSelect({ estado: "", tipo: "" });
//   }, []);

//   useEffect(() => {
//     if (!isFetching) {
//       handleDispatchEdit(dispatch, currentLlamada, LLAMADA);
//       setSelect({
//         estado: { label: currentLlamada.estado, value: currentLlamada.estado },
//         tipo: { label: currentLlamada.tipo, value: currentLlamada.tipo },
//       });
//     }
//   }, [isFetching]);

//   const crear = async e => {
//     e.preventDefault();
//     setAction({ saving: true, error: false, message: "" });
//     try {
//       await deleLlamadas(llamada.llamada_id, { ...llamada });
//       setAction({ saving: false, error: false, message: "Llamada eliminada exitosamente." });
//       setTimeout(() => navigate("/actividades/llamadas"), 2000);
//     } catch (e) {
//       setAction({ saving: false, error: true, message: e.message });
//     };
//   };

//   return (
//     <div>
//       {isFetching ?
//         <CircularProgress size={24} /> : <section className="section w-full m-auto">
//           <Titulo1>
//             Eliminar Llamada
//           </Titulo1>
//           {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
//           <form>
//             <DatosLlamada llamada={llamada} dispatch={dispatch} manageSelect={{ setSelect, select }} />
//             <Guardar saving={action.saving} guardar={crear} />
//             <Volver navigate={navigate} />
//           </form>
//         </section>}
//     </div>
//   )

// };

export default EditarLlamada;