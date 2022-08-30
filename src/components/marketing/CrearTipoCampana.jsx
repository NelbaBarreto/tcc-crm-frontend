import React from "react";

const CrearTipoCampana = () => {
    return (
        <div>
            <section className="section w-full m-auto">
                <h1 className="title is-3 text-center">Nuevo Tipo Campaña</h1>
                <form>
                    <div className="field">
                        <label className="label">Nombre del Tipo Campaña</label>
                        <div className="control">
                            <input
                                name="nomTipo"
                                className="input shadow-lg"
                                type="text"
                                placeholder="Ingrese el Tipo Campaña"
                            />
                        </div>
                    </div>

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

                    <div className="field mt-3">
                        <div className="control">
                            <button
                                className="button float-right font-semibold shadow-lg text-white hover:text-white hover:bg-lila-700 bg-lila-400 border-lila-700"
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

export default CrearTipoCampana;