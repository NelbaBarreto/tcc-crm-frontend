import React, { useState, useContext } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Titulo1 } from "../../formulario/Titulo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Datepicker, Input } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getSedes } from "../../../api/sedes";
import { CheckboxGroup } from "../../formulario/Componentes";
import AppContext from "../../../utils/AppContext";

const DatosCiclo = ({ onChange, curso }) => {
  const [select, setSelect] = useState({ nivel: "" });

  const {
    data: sedes,
    sedesLoading
  } = useQuery(["sedes"], getSedes);

  const opcionesSede = sedesLoading || !sedes ? [] :
    sedes.map(sede => ({ value: sede.sede_id, label: sede.nombre }));

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
            onChange={e => { onChange(e, "sede_id", e?.value); setSelect({ ...select, sede: e }) }}
            value={select.sede}
            options={opcionesSede}
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
          //options={opcionesSede}
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

const DatosAulas = ({ aula }) => {
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
              <CheckboxGroup 
                label={"Días de clases"} 
                options={opcionesDias}
                name="dias"
                value={"Lunes"}
                onChange={e => console.log(e)}
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
                  <button
                    onClick={console.log("a")}
                  >
                    <span>Agregar</span>
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={solid("plus")} />
                    </span>
                  </button>
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
  const { state: { aula }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    // setAction({ saving: true, error: false, message: "" });
    // try {
    //   await createCurso(state.curso);
    //   setAction({ saving: false, error: false, message: "Curso creado exitosamente." });
    //   setTimeout(() => navigate("/educacion/cursos"), 3000);
    // } catch (e) {
    //   setAction({ saving: false, error: true, message: e.message });
    // };
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
            onChange={handleDispatch} 
            curso={state.curso} 

          />
          <DatosAulas 
            // onChange={handleDispatch} 
            aula={aula} 
          />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearCiclo;