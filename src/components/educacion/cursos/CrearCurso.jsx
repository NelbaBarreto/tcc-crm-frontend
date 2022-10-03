import React, { useState } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { useNavigate } from "react-router-dom";
import { createCurso } from "../../../api/cursos";
import { useQuery } from "react-query";
import { getProfesores } from "../../../api/profesores";
import { getSucursales } from "../../../api/sucursales";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Datepicker, Input } from "../../formulario/Componentes";

const DatosCurso = ({ curso, setCurso }) => {
  const [profesor, setProfesor] = useState("");
  const [sucursal, setSucursal] = useState("");

  const {
    data: profesores,
    profesoresLoading
  } = useQuery(["profesores"], getProfesores);

  const {
    data: sucursales,
    sucursalesLoading
  } = useQuery(["sucursales"], getSucursales);

  const opcionesProfesor = profesoresLoading || !profesores ? [] :
    profesores.map(profesor => ({ value: profesor.profesor_id, label: profesor.nombre }));

  const opcionesSucursal = sucursalesLoading || !sucursales ? [] :
    sucursales.map(sucursal => ({ value: sucursal.sucursal_id, label: sucursal.nombre }));

  return (
    <Seccion titulo="Datos del Curso">
      <Input
        name="nombre"
        label="Nombre"
        onChange={e => setCurso({ ...curso, [e.target.name]: e.target.value })}
      />
      <Dropdown
        label="Profesor"
        name="profesor_id"
        onChange={e => setProfesor(e)}
        value={profesor}
        options={opcionesProfesor}
      />
      <Dropdown
        label="Sucursal"
        name="sucursal_id"
        onChange={e => setSucursal(e)}
        value={sucursal}
        options={opcionesSucursal}
      />
      <div className="columns">
        <div className="column">
          <Datepicker
            label="Fecha de Inicio"
            name="fec_ini_curso"
            value={sucursal}
          />
        </div>
        <div className="column">
          <Datepicker
            label="Fecha Fin"
            name="fec_fin_curso"
            value={sucursal}
          />
        </div>
      </div>
      <Dropdown
        label="Horario"
        name="horario"
        options={[{ label: "tarde", value: "tarde" }]}
      />
    </Seccion>
  );
};

const CrearCurso = () => {
  const [curso, setCurso] = useState();
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setState({ saving: true, error: false, message: "" });
    try {
      await createCurso(curso);
      setState({ saving: false, error: false, message: "Curso creado exitosamente." });
      setTimeout(() => navigate("/educacion/cursos"), 3000);
    } catch (e) {
      setState({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Curso
        </Titulo1>
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <DatosCurso curso={curso} setCurso={setCurso} />
          <Guardar saving={state.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearCurso;