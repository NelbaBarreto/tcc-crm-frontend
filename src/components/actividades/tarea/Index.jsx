import React from "react";
import DataTables from "../../DataTables";
import classNames from "classnames";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton2 } from "../../formulario/Componentes";
import { useQuery } from "react-query";
import { getTareas } from "../../../api/tareas";
import { NavLink } from "react-router-dom";
import { format, parseISO } from "date-fns";

const Index = ({ lead_id }) => {
  const {
    data: tareas,
    isLoading
  } = useQuery(["tareas", lead_id], () => getTareas({ lead_id }));

  const columns = [
    {
      name: "tarea_id",
      options: {
        display: "excluded",
        filter: false
      }
    },
    {
      name: "asunto",
      label: "Asunto",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <NavLink
              to={"/actividades/tareas/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "prioridad",
      label: "Prioridad",
      options: {
        filter: true,
        filterType: "dropdown",
        sort: true,
        customBodyRender: (value) => {
          if (value === "Alta") {
            return <span className="tag is-light is-danger font-bold">{value}</span>
          } else if (value === "Media") {
            return <span className="tag is-light is-warning font-bold">{value}</span>
          } else {
            return <span className="tag is-light is-info font-bold">{value}</span>
          }
        },
      }
    },    
    {
      name: "estado",
      label: "Estado",
      options: {
        filter: true,
        filterType: "dropdown",
        sort: true,
      }
    },
    {
      name: "lead",
      label: "Lead",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value) => {
          if (value) {
            return (
              <NavLink
                to={"/ventas/leads/" + value.lead_id}
                className="underline text-blue-900"
              >
                {value.persona?.nombre}
              </NavLink>
            )
          } else {
            return null;
          }
        }
      }
    },
    {
      name: "contacto",
      label: "Contacto",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value) => {
          if (value) {
            return (
              <NavLink
                to={"/ventas/contactos/" + value.contacto_id}
                className="underline text-blue-900"
              >
                {value.persona?.nombre}
              </NavLink>
            )
          } else {
            return null;
          }
        }
      }
    },
    {
      name: "usuario",
      label: "Usuario Asignado",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value) => {
          if (value) {
            return (
              <span>
                {value.nom_usuario}
              </span>
            )
          } else {
            return null;
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
                  to={"/actividades/tareas/editar/" + tableMeta.rowData[0]}
                  className="button is-link is-outlined is-normal"
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={solid("pen-to-square")} />
                  </span>
                </NavLink>
              </p>
              <p className="control">
                <NavLink
                  to={"/actividades/tareas/eliminar/" + tableMeta.rowData[0]}
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
    <section className={classNames("w-full m-auto", { "section": !lead_id })}>
      {!lead_id && <NavLink
        to="/actividades/tareas/nuevo"
        className={classNameButton2}
      >
        <span>Crear Nuevo</span>
        <span className="icon is-small">
          <FontAwesomeIcon icon={solid("plus")} />
        </span>
      </NavLink>}
      <DataTables
        title="Listado de Tareas"
        columns={columns}
        data={tareas}
        isLoading={isLoading}
      />
    </section>
  )
}

export default Index;