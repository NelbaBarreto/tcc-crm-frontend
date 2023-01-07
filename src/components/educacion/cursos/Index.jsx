import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton1, classNameButton2 } from "../../formulario/Componentes";
import { useQuery } from "react-query";
import { getCursos } from "../../../api/cursos";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: cursos,
    isLoading
  } = useQuery(["cursos"], getCursos);

  const columns = [
    {
      name: "curso_id",
      options: {
        display: "excluded",
        filter: false
      }
    },
    {
      name: "nombre",
      label: "Nombre",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <NavLink
              to={"/educacion/cursos/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (_value, tableMeta) => {
          return (
            <div className="field is-grouped">
              <div className="control">
                <NavLink
                  to={"/educacion/cursos/editar/" + tableMeta.rowData[0]}
                  className={classNameButton1}
                >
                  Editar
                </NavLink>
              </div>
            </div>
          );
        }
      }
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (_value, tableMeta) => {
          return (
            <div className="field is-grouped">
              <div className="control">
                <NavLink
                  to={"/educacion/cursos/eliminar/" + tableMeta.rowData[0]}
                  className={classNameButton1}
                >
                  Eliminar
                </NavLink>
              </div>
            </div>
          );
        }
      }
    },
  ];

  return (
    <div>
      <section className="section w-full m-auto">
        <NavLink
          to="/educacion/cursos/nuevo"
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Cursos"
          columns={columns}
          data={cursos}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;