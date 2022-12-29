import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Button1 } from "../../formulario/Componentes";
import { Volver, Eliminar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea, Datepicker } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { deleTarea, getPrioridades, getEstados, getTarea } from "../../../api/tareas";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const TAREA = "tarea";

// const DatosTarea = ({ tarea, dispatch, manageSelect }) => {
//     const { setSelect, select } = manageSelect;

//     const {
//         data: usuarios,
//         usuariosLoading
//     } = useQuery(["usuarios"], getUsuarios);

//     const {
//         data: prioridades,
//         prioridadesLoading
//     } = useQuery(["prioridades"], getPrioridades);

//     const {
//         data: estados,
//         estadosLoading
//     } = useQuery(["estados"], getEstados);

//     const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
//         usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

//     const opcionesPrioridades = prioridadesLoading || !prioridades ? [] :
//         prioridades.map(prioridad => ({ value: prioridad, label: prioridad }));

//     const opcionesEstados = estadosLoading || !estados ? [] :
//         estados.map(estado => ({ value: estado, label: estado }));

//     return (
//         <Seccion titulo="Datos de la Tarea">
//             <div className="columns is-desktop">
//                 <div className="column">
//                     <Input
//                         label="Asunto"
//                         name="asunto"
//                         value={tarea?.asunto || ""}
//                         onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TAREA)}
//                     />
//                 </div>
//                 <div className="column">
//                     <Dropdown
//                         label="Estado"
//                         value={select.estado}
//                         options={opcionesEstados}
//                         onChange={e => {
//                             handleDispatch(dispatch, "estado", e?.value, TAREA);
//                             setSelect({ ...select, estado: e })
//                         }}
//                     />
//                 </div>
//             </div>

//             <div className="columns is-desktop">
//                 <div className="column">
//                     <Dropdown
//                         label="Usuario Asignado"
//                         value={select.usu_asignado}
//                         options={opcionesUsuarios}
//                         onChange={e => {
//                             handleDispatch(dispatch, "usu_asignado_id", e?.value, TAREA);
//                             setSelect({ ...select, usu_asignado: e })
//                         }}
//                     />
//                 </div>

//                 <div className="column">
//                     <Dropdown
//                         label="Prioridad"
//                         value={select.prioridad}
//                         options={opcionesPrioridades}
//                         onChange={e => {
//                             handleDispatch(dispatch, "prioridad", e?.value, TAREA);
//                             setSelect({ ...select, prioridad: e })
//                         }}
//                     />
//                 </div>
//             </div>
//             <div className="columns is-desktop">
//                 {/* <div className="column">
//                     <Datepicker
//                         label="Fecha de Inicio"
//                         selected={tarea?.fec_inicio || ""}
//                         onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, TAREA)}
//                     />
//                 </div>
//                 <div className="column">
//                     <Datepicker
//                         label="Fecha Fin"
//                         selected={tarea?.fec_fin || ""}
//                         onChange={fecha => handleDispatch(dispatch, "fec_fin", fecha, TAREA)}
//                     />
//                 </div> */}
//             </div>
//             <TextArea
//                 label="Descripción"
//                 name="descripcion"
//                 value={tarea?.descripcion || ""}
//                 onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TAREA)}
//             />
//         </Seccion >
//     );
// };

const EliminarTarea = () => {
    const { state: { tarea }, dispatch } = useContext(AppContext);
    const [select, setSelect] = useState({ estado: "", prioridad: "" });
    const [action, setAction] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const {
      data: currentTarea,
      isFetching,
    } = useQuery(["tarea", id], () => getTarea(id));
  
    useEffect(() => {
      handleStateCleared(dispatch);
      setSelect({ estado: "", prioridad: "" });
    }, []);
  
    useEffect(() => {
      if (!isFetching) {
        handleDispatchEdit(dispatch, currentTarea, TAREA);
        setSelect({
          estado: { label: currentTarea.estado, value: currentTarea.estado },
          prioridad: { label: currentTarea.prioridad, value: currentTarea.prioridad },
          usu_asignado: { label: currentTarea.usuario?.nom_usuario, value: currentTarea.usuario?.usuario_id }
        });
      }
    }, [isFetching]);
  
    const eliminar = async e => {
      e.preventDefault();
      setAction({ saving: true, error: false, message: "" });
      try {
        await deleTarea(tarea.tarea_id);
        setAction({ saving: false, error: false, message: "Tarea Eliminada exitosamente." });
        setTimeout(() => navigate("/actividades/tareas"), 2000);
      } catch (e) {
        setAction({ saving: false, error: true, message: e.message });
      };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    ¿Desea Eliminar esta Tarea?
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
            
                    <Eliminar saving={action.saving} eliminar={eliminar}/>
                    <Volver navigate={navigate} />
                
            </section>
        </div>
    )
};

export default EliminarTarea;


// const confirmAction = () => {
//     // eslint-disable-next-line no-restricted-globals
//     const response = confirm("Esta seguro que desea eliminar este registro?");

//     if (response) {
//         alert("El registro a sido eliminado");
        
//     } else {
//         alert("El registro no a sido eliminado");
//     }
// }

// export default confirmAction;
