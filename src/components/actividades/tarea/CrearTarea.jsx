import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { createTarea } from "../../../api/tareas";
import { reducer } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const DatosTarea = ({ onChange }) => {
    const [select, setSelect] = useState({ estado: "", prioridad: "" });

    const {
        data: usuarios,
        usuariosLoading
    } = useQuery(["usuarios"], getUsuarios);

    const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
        usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

    return (
        <Seccion titulo="Datos de la Tarea">
            <div className="columns is-desktop">
                <div className="column">
                    <div className="field">
                        <label className="label">Asunto:</label>
                        <div className="control">
                            <input
                                name="asunto"
                                className="input shadow-lg"
                                type="text"
                                placeholder="Ingrese el asunto de la Tarea"
                            />
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">Estado: </label>
                        <div className="control">
                            <div className="select">
                                <select>
                                    <option>Pendiente</option>
                                    <option>Asignado</option>
                                    <option>En curso</option>
                                    <option>Cancelado</option>
                                    <option>Finalizado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns is-desktop">
                <div className="column">
                    <Dropdown
                        label="Usuario Asignado"
                        value={select.usu_asignado}
                        options={opcionesUsuarios}
                        onChange={e => { onChange(e, "usu_asignado_id", e?.value); setSelect({ ...select, usu_asignado: e }) }}
                    />
                </div>

                <div className="column">
                    <div className="field">
                        <label className="label">Prioridad: </label>
                        <div className="control">
                            <div className="select">
                                <select>
                                    <option>Alta</option>
                                    <option>Media</option>
                                    <option>Baja</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns is-desktop">
                <div className="column">
                    <div className="field">
                        <label className="label">Fecha de Inicio: </label>
                        <div className="control">
                            <input
                                name="fechaIni"
                                className="input shadow-lg"
                                type="date"
                                placeholder="Ingrese la Fecha de Inicio"
                            />
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">Fecha de Finalizacion</label>
                        <div className="control">
                            <input
                                name="fechaFin"
                                className="input shadow-lg"
                                type="date"
                                placeholder="Ingrese la fecha de finalizacion"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="field">
                <label className="label">Descripción</label>
                <div className="control">
                    <textarea
                        name="descripcion"
                        className="textarea"
                        type="text"
                        placeholder="Ingrese una descripción"
                    />
                </div>
            </div>

        </Seccion >
    );
};

const CrearTarea = () => {
    const [state, dispatch] = useReducer(reducer, {});
    const [action, setAction] = useState({});
    const navigate = useNavigate();

    const handleDispatch = (e, name, value = " ") => {
        dispatch({
            type: "FORM_UPDATED",
            payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "tarea" }
        })
    }

    const crear = async e => {
        e.preventDefault();
        setAction({ saving: true, error: false, message: "" });
        try {
            await createTarea({ ...state.persona });
            setAction({ saving: false, error: false, message: "Tarea creada exitosamente." });
            setTimeout(() => navigate("/actividades"), 3000);
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
                    <DatosTarea tarea={state.tarea} onChange={handleDispatch} />
                    <Guardar saving={action.saving} guardar={crear} />
                    <Volver navigate={navigate} />
                </form>
            </section>
        </div>
    )
};

export default CrearTarea;