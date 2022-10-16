import React, { useState, useReducer } from "react";
import Seccion from "../formulario/Seccion";
import MostrarMensaje from "../formulario/MostrarMensaje";
import { Volver, Guardar } from "../formulario/Acciones";
import { Titulo1 } from "../formulario/Titulo";
import { Dropdown } from "../formulario/Componentes";
import { getUsuarios } from "../../api/usuarios";
import { createCaso } from "../../api/casos";
import { reducer } from "../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const DatosCaso = ({ onChange }) => {
    const [select, setSelect] = useState({ estado: "", origen: "", campana: "", usu_asignado: "" });

  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

    return (
        <Seccion titulo="Datos del Caso">

            <div className="columns is-desktop">
                <div className="column">
                    <div className="field">
                        <label className="label">Nombre del Caso</label>
                        <div className="control">
                            <input
                                name="nombre"
                                className="input shadow-lg"
                                type="text"
                                placeholder="Ingrese el nombre del Caso"
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
                                    <option>Confirmado</option>
                                    <option>Anulado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns is-mobile">
                <div className="column">
                    <div className="column">
                        <Dropdown
                            label="Usuario Asignado"
                            value={select.usu_asignado}
                            options={opcionesUsuarios}
                            onChange={e => { onChange(e, "usu_asignado_id", e?.value); setSelect({ ...select, usu_asignado: e }) }}
                        />
                    </div>
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

            <div className="columns is-mobile">
                <div className="column">
                    <div className="field">
                        <label className="label">Solución del Caso</label>
                        <div className="control">
                            <textarea
                                name="desCaso"
                                className="textarea"
                                type="text"
                                placeholder="Ingrese la solucion para el caso"
                            />
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">Descripción del Caso</label>
                        <div className="control">
                            <textarea
                                name="desCaso"
                                className="textarea"
                                type="text"
                                placeholder="Ingrese una descripción"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </Seccion>
    );
};

const CrearCaso = () => {
    const [state, dispatch] = useReducer(reducer, {});
    const [action, setAction] = useState({});
    const navigate = useNavigate();

    const handleDispatch = (e, name, value = " ") => {
        dispatch({
            type: "FORM_UPDATED",
            payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "caso" }
        })
    }

    const crear = async e => {
        e.preventDefault();
        setAction({ saving: true, error: false, message: "" });
        try {
            await createCaso({ ...state.persona });
            setAction({ saving: false, error: false, message: "Caso creado exitosamente." });
            setTimeout(() => navigate("/soporte"), 3000);
        } catch (e) {
            setAction({ saving: false, error: true, message: e.message });
        };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    Nuevo Caso
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
                <form>
                    <DatosCaso caso={state.caso} onChange={handleDispatch} />
                    <Guardar saving={action.saving} guardar={crear} />
                    <Volver navigate={navigate} />
                </form>
            </section>
        </div>
    )
};

export default CrearCaso;