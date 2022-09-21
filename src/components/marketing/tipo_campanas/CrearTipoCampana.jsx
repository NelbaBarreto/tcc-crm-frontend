import React, { useState } from "react";
import Volver from "../../Volver";
import Guardar from "../../Guardar";
import { useNavigate } from "react-router-dom";
import { createTip_campana } from "../../../api/tip_campanas";

const CrearTipoCampana = () => {
    const [tip_campana, setTip_campana] = useState({});
    const navigate = useNavigate();

    const crear = async e => {
        e.preventDefault();
        await createTip_campana(tip_campana);
    };
    return (
        <div>
            <section className="section w-full m-auto">
                <h1 className="title is-3 text-center">Nuevo Tipo Campaña</h1>
                <form>
                    <div className="field">
                        <label className="label">Nombre del Tipo Campaña</label>
                        <div className="control">
                            <input
                                name="nombre"
                                className="input shadow-lg"
                                type="text"
                                onChange={e => setTip_campana({ ...tip_campana, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Estado: </label>
                        <div className="control">
                            <div className="select">
                                <select>
                                    <option>Activo</option>
                                    <option>Inactivo</option>
                                    onChange={e => setTip_campana({ ...tip_campana, [e.target.name]: e.target.value })}
                                </select>
                            </div>
                        </div>
                    </div>
                <Guardar guardar={crear} />
                </form>
                <Volver navigate={navigate} />
            </section>
        </div>
    )
};

export default CrearTipoCampana;