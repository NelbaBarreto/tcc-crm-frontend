import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Datepicker, Input, TextArea } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { reducer } from "../../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";
import { createCurso } from "../../../api/cursos";
import { useQuery } from "react-query";
import { getSucursales } from "../../../api/sucursales";

const DatosCiclo = ({ onChange, curso }) => {
  const [sucursal, setSucursal] = useState("");
  const [nivel, setNivel] = useState("");

  const {
    data: sucursales,
    sucursalesLoading
  } = useQuery(["sucursales"], getSucursales);

  const opcionesSucursal = sucursalesLoading || !sucursales ? [] :
    sucursales.map(sucursal => ({ value: sucursal.sucursal_id, label: sucursal.nombre }));

  return (
    <Seccion titulo="Datos del Ciclo">
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Nivel"
            onChange={e => { onChange(e, "nivel", e.value); setNivel(e) }}
            value={nivel}
            options={[{ label: "Avanzado", value: "avanzado" }]}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Sede"
            onChange={e => { onChange(e, "sucursal_id", e.value); setSucursal(e) }}
            value={sucursal}
            options={[{ label: "España", value: "espana" }]}
            //options={opcionesSucursal}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <Input
            name="precio"
            label="Precio"
            value={curso?.precio}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Datepicker
            label="Fecha de Inicio"
            name="fec_ini_curso"
            selected={curso?.fec_ini_curso}
            onChange={date => onChange(null, "fec_ini_curso", date)}
          />
        </div>
        <div className="column">
          <Datepicker
            label="Fecha Fin"
            name="fec_fin_curso"
            selected={curso?.fec_fin_curso}
            onChange={date => onChange(null, "fec_fin_curso", date)}
          />
        </div>
      </div>
    </Seccion>
  );
};

const DatosAulas = () => {
  return (
    <Seccion titulo="Agregar Aulas">

    </Seccion>
  );
}

const CrearCiclo = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createCurso(state.curso);
      setAction({ saving: false, error: false, message: "Curso creado exitosamente." });
      setTimeout(() => navigate("/educacion/cursos"), 3000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  const handleDispatch = (e, name, value) => {
    dispatch({
      type: "FORM_UPDATED",
      payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "curso" }
    })
  }

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Ciclo
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosCiclo onChange={handleDispatch} curso={state.curso} />
          <DatosAulas />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearCiclo;