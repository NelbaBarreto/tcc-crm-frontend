import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton2 } from "../../formulario/Componentes";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import { getCiclos } from "../../../api/ciclos";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: ciclos,
    isLoading
  } = useQuery(["ciclos"], getCiclos);

  const columns = [
    {
      name: "ciclo_id",
      options: {
        display: "excluded",
        filter: false
      }
    },
    {
      name: "codigo",
      label: "CÓDIGO",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <NavLink
              to={"/educacion/ciclos/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "curso",
      label: "CURSO",
      options: {
        filter: false,
        filterType: "textField",
        sort: true,
        customBodyRender: value => {
          if (value) {
            return (
              <NavLink
                to={"/educacion/cursos/" + value.curso_id}
                className="underline text-blue-900"
              >
                {value.nombre}
              </NavLink>
            );
          } else {
            return null;
          }
        }
      }
    },    
    {
      name: "fec_inicio",
      label: "FECHA DE INICIO",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          if (value) {
            return (
              <span>{format(parseISO(value), "dd/MM/yyyy")}</span>
            )
          } else {
            return null;
          }
        }
      }
    },
    {
      name: "fec_fin",
      label: "FECHA DE FIN",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          if (value) {
            return (
              <span>{format(parseISO(value), "dd/MM/yyyy")}</span>
            )
          } else {
            return null;
          }
        }
      }
    },        
    {
      name: "fec_insercion",
      label: "FECHA DE CREACIÓN",
      options: {
        filter: false,
        filterType: "textField",
        sort: false,
        customBodyRender: (value) => {
          if (value) {
            return (
              <span>{format(parseISO(value), "dd/MM/yyyy hh:mm")}</span>
            )
          } else {
            return null;
          }
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
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <NavLink
                  to={"/educacion/ciclos/editar/" + tableMeta.rowData[0]}
                  className="button is-link is-outlined is-normal"
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={solid("pen-to-square")} />
                  </span>
                </NavLink>
              </p>
              <p className="control">
                <NavLink
                  to={"/educacion/ciclos/eliminar/" + tableMeta.rowData[0]}
                  className="button is-danger is-outlined is-normal"
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={solid("trash")} />
                  </span>
                </NavLink>
              </p>
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
          to="/educacion/ciclos/nuevo"
          className={classNameButton2}
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Ciclos"
          columns={columns}
          data={ciclos}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;