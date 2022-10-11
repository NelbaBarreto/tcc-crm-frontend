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

const DatosCurso = ({ onChange, curso }) => {
  const [sucursal, setSucursal] = useState("");
  const [horario, setHorario] = useState("");

  const {
    data: sucursales,
    sucursalesLoading
  } = useQuery(["sucursales"], getSucursales);

  const opcionesSucursal = sucursalesLoading || !sucursales ? [] :
    sucursales.map(sucursal => ({ value: sucursal.sucursal_id, label: sucursal.nombre }));

  return (
    <Seccion titulo="Datos del Curso">
      <Input
        name="nombre"
        label="Nombre"
        value={curso?.nombre}
        onChange={onChange}
      />
      <TextArea
        name="descripcion"
        label="Descripción"
        value={curso?.descrpcion}
        onChange={onChange}
      />
      <Dropdown
        label="Sede"
        onChange={e => {onChange(e, "sucursal_id", e.value); setSucursal(e)}}
        value={sucursal}
        options={opcionesSucursal}
      />
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
      <Dropdown
        label="Horario"
        value={horario}
        onChange={e => {onChange(e, "horario", e.value); setHorario(e)}}
        options={[{ label: "tarde", value: "tarde" }]}
      />
    </Seccion>
  );
};

const DatosAulas = () => {
  return (
    <Seccion titulo="Agregar Aulas">

    </Seccion>
  );
}

const CrearCurso = () => {
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
    dispatch({ type: "FORM_UPDATED", 
      payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "curso" } 
    })
  }

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Curso
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosCurso onChange={handleDispatch} curso={state.curso} />
          <DatosAulas />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearCurso;