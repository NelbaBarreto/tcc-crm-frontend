import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Titulo1 } from "../../formulario/Titulo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Datepicker, Input, Button1 } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { reducer } from "../../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";
import { createCurso } from "../../../api/cursos";
import { useQuery } from "react-query";
import { getSucursales } from "../../../api/sucursales";

const DatosCiclo = ({ onChange, curso }) => {
  const [select, setSelect] = useState({ nivel: "" });

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
            onChange={e => { onChange(e, "nivel", e?.value); setSelect({ ...select, nivel: e }) }}
            value={select.nivel}
            options={[{ label: "Avanzado", value: "avanzado" }]}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Sede"
            onChange={e => { onChange(e, "sucursal_id", e?.value); setSelect({ ...select, sucursal: e }) }}
            value={select.sucursal}
            options={opcionesSucursal}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Input
            name="precio"
            label="Precio"
            value={curso?.precio}
            onChange={onChange}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Modalidad"
            onChange={e => { onChange(e, "modalidad", e?.value); setSelect({ ...select, modalidad: e }) }}
            value={select.modalidad}
            options={[{ label: "Presencial", value: "presencial" }]}
          //options={opcionesSucursal}
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

const MostrarAulas = () => {
  return (
    <table className="table is-striped is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>Aula</th>
          <th>Cant. Máxima Alumnos</th>
          <th>Horario</th>
          <th>Días</th>
          <th></th>
        </tr>
      </thead>
    </table>
  );
}

const DatosAulas = ({ onChange }) => {
  const [select, setSelect] = useState({ dias: [] });
  const opcionesDias = [
    { label: "Lunes", value: "lunes" },
    { label: "Martes", value: "martes" },
    { label: "Miércoles", value: "miercoles" },
    { label: "Jueves", value: "jueves" },
    { label: "Viernes", value: "viernes" },
    { label: "Sábado", value: "sabado" },
    { label: "Domingo", value: "domingo" }
  ];

  return (
    <Seccion titulo="Agregar Aulas">
      <div className="columns">
        <div className="column is-three-fifths">
          <div className="columns">
            <div className="column">
              <Dropdown
                label="Aula"
                //onChange={e => { onChange(e, "nivel", e.value); setNivel(e) }}
                //value={nivel}
                options={[{ label: "Avanzado", value: "avanzado" }]}
              />
              <Input
                name="hor_inicio"
                label="Hora Inicio"
                //value={curso?.precio}
                onChange={onChange}
              />
              <Dropdown
                label="Horario Semanal"
                onChange={e => { onChange(e, "dias", e.value); setSelect({ ...select, dias: e }) }}
                value={select.dias}
                isMulti={true}
                options={opcionesDias}
              />
            </div>
            <div className="column">
              <Input
                name="cantidad_alumnos"
                label="Cantidad Máxima de Alumnos"
                //value={curso?.precio}
                onChange={onChange}
              />
              <Input
                name="hor_fin"
                label="Hora Fin"
                //value={curso?.precio}
                onChange={onChange}
              />
              <div className="field mt-3">
                <div className="control">
                  <Button1
                    onClick={console.log("a")}
                  >
                    <span>Agregar</span>
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={solid("plus")} />
                    </span>
                  </Button1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <MostrarAulas />
        </div>
      </div>
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
          <DatosAulas onChange={handleDispatch} curso={state.curso} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearCiclo;