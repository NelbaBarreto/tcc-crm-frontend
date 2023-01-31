import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import { getOrganizaciones } from "../../../api/organizaciones";
import { NavLink } from "react-router-dom";
import { classNameButton2 } from "../../formulario/Componentes";

const Index = () => {
  const {
    data: organizaciones,
    isLoading
  } = useQuery(["organizaciones"], getOrganizaciones);

  const columns = [
    {
      name: "organizacion_id",
      options: {
        display: "excluded",
        filter: false
      }
    },
    {
      name: "persona",
      label: "Nombre",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value, tableMeta) => {
          if (value) {
            return (
              <NavLink
                to={"/ventas/organizaciones/" + tableMeta.rowData[0]}
                className="underline text-blue-900"
              >
                {value.nombre}
              </NavLink>
            )
          }
        }
      }
    },
    {
      name: "website",
      label: "Website",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: value => {
          if (value) {
            return (
              <a 
                className="underline text-blue-900" 
                href={value}
                target="_blank"
                rel="noreferrer"
              >
                {value}
              </a>
            )
          }
        }
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
                  to={"/ventas/organizaciones/editar/" + tableMeta.rowData[0]}
                  className="button is-link is-outlined is-normal"
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={solid("pen-to-square")} />
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
          to="/ventas/organizaciones/nuevo"
          className={classNameButton2}
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Organizaciones"
          columns={columns}
          data={organizaciones}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;