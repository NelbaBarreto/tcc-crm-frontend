import React from "react";

const CrearTarea = () => {
    return (
        <div>
            <section className="section w-full m-auto">
                <h1 className="title is-3 text-center">Nueva Tarea</h1>
                <form>

                    <div class="columns is-desktop">
                        <div class="column">
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
                        <div class="column">
                            <div className="field">
                                <label className="label">Estado: </label>
                                <div class="control">
                                    <div class="select">
                                        <select>
                                            <option>Activo</option>
                                            <option>Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div className="field">
                                <label className="label">Prioridad: </label>
                                <div class="control">
                                    <div class="select">
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

                    <div class="columns is-desktop">
                        <div class="column">
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
                        <div class="column">
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
                        <label className="label">Descripción de la llamada</label>
                        <div className="control">
                            <textarea
                                name="desLlamada"
                                className="textarea"
                                type="text"
                                placeholder="Ingrese una descripción"
                            />
                        </div>
                    </div>

                    <div className="field mt-3">
                        <div className="control">
                            <button
                                className="button float-right is-success"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div >
    )
};

export default CrearTarea;