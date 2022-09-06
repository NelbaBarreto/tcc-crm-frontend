import React from "react";
import TimeInput from "react-input-time";

const CrearLlamada = () => {

    return (
        <div>
            <section className="section w-full m-auto">
                <h1 className="title is-3 text-center">Nuevo Registro de Llamada</h1>
                <form>

                    <div class="columns is-mobile">
                        <div class="column">
                            <div className="field">
                                <label className="label">Fecha</label>
                                <div className="control">
                                    <input
                                        name="codPersona"
                                        className="input shadow-lg"
                                        type="date"
                                        placeholder="Ingrese la Fecha de la llamada"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div className="field">
                                <label className="label">Resultado: </label>
                                <div class="control">
                                    <div class="select">
                                        <select>
                                            <option>Ocupado</option>
                                            <option>Conectado</option>
                                            <option>Dejo un mensaje</option>
                                            <option>Sin respuesta</option>
                                            <option>Nro Incorrecto</option>
                                            <option>Proxima llamada</option>
                                            <option>Oportunidad Cerrada</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns is-mobile">
                        <div class="column">
                            <div className="field">
                                <label className="label">Hora: </label>
                                <div className="control">
                                    <TimeInput
                                        className="input shadow-lg"
                                        initialTime="00:00"
                                        onChange={(event) => { }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div className="field">
                                <label className="label">Descripción de la llamada</label>
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
        </div>
    )
};

export default CrearLlamada;