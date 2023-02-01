import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import useToken from "../../../utils/useToken";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Datepicker } from "../../formulario/Componentes";
import { getSedes } from "../../../api/sedes";
import { getCursos } from "../../../api/cursos";
import { createCiclo } from "../../../api/ciclos";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const CICLO = "ciclo";

const DatosCiclo = ({ ciclo = {}, dispatch, select = {} }) => {
  const {
    data: cursos,
    cursosLoading
  } = useQuery(["cursos"], getCursos);

  const {
    data: sedes,
    sedesLoading
  } = useQuery(["sedes"], getSedes);

  const opcionesSedes = sedesLoading || !sedes ? [] :
    sedes.map(sede => ({ value: sede.sede_id, label: sede.nombre }));

  const opcionesCursos = cursosLoading || !cursos ? [] :
    cursos.map(curso => ({ value: curso.curso_id, label: curso.nombre }));

  return (
    <Seccion titulo="Datos del Ciclo">
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Curso*"
            options={opcionesCursos}
            value={select.curso}
            onChange={e => {
              handleDispatch(dispatch, "curso_id", e?.value, CICLO);
              handleDispatch(dispatch, "curso", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Sede*"
            options={opcionesSedes}
            value={select.sede}
            onChange={e => {
              handleDispatch(dispatch, "sede_id", e?.value, CICLO);
              handleDispatch(dispatch, "sede", e, "select")
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Datepicker
            label="Fecha de Inicio*"
            selected={ciclo?.fec_inicio || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, CICLO)}
          />
        </div>
        <div className="column">
          <Datepicker
            label="Fecha Fin*"
            selected={ciclo?.fec_fin || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_fin", fecha, CICLO)}
          />
        </div>
      </div>
    </Seccion>
  );
};

const CrearCiclo = () => {
  const { state: { ciclo, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const { usuario = {} } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createCiclo({ ...ciclo, usu_insercion: usuario.nom_usuario, usu_modificacion: usuario.nom_usuario });
      setAction({ saving: false, error: false, message: "Ciclo creado exitosamente." });
      setTimeout(() => navigate("/educacion/ciclos"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Ciclo
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosCiclo
            ciclo={ciclo}
            select={select}
            dispatch={dispatch}
          />
          <Guardar
            saving={action.saving}
            guardar={crear}
          />
          <Volver
            navigate={navigate}
          />
        </form>
      </section>
    </div>
  )
};

export default CrearCiclo;