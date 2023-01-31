import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getProfesores } from "../../../api/profesores";
import { NavLink } from "react-router-dom";
import { classNameButton2 } from "../../formulario/Componentes";
import { format, parseISO } from "date-fns";

const Index = () => {
  const {
    data: profesores,
    isLoading
  } = useQuery(["profesores"], getProfesores);

  const columns = [
    {
      name: "profesor_id",
      options: {
        display: "excluded",
        filter: false
      }
    },
    
    {
      name: "persona.nombre",
      label: "Nombre",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <NavLink
              to={"/educacion/profesores/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "persona.nro_documento",
      label: "Numero de Documento",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "persona.email",
      label: "Correo",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "fec_insercion",
      label: "Fecha de Creación",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
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
                  to={"/educacion/profesores/editar/" + tableMeta.rowData[0]}
                  className="button is-link is-outlined is-normal"
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={solid("pen-to-square")} />
                  </span>
                </NavLink>
              </p>
              <p className="control">
                <NavLink
                  to={"/educacion/profesores/eliminar/" + tableMeta.rowData[0]}
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
          to="/educacion/profesores/nuevo"
          className={classNameButton2}
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Profesores"
          columns={columns}
          data={profesores}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;