import React from "react";
import DataTables from "../../DataTables";
import classNames from "classnames";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton1, classNameButton2 } from "../../formulario/Componentes";
import { useQuery } from "react-query";
import { getLlamadas } from "../../../api/llamadas";
import { NavLink } from "react-router-dom";
import { format, parseISO } from "date-fns";

const Index = ({ lead_id }) => {
  const {
    data: llamadas,
    isLoading
  } = useQuery(["llamadas", lead_id], () => getLlamadas({ lead_id }));

  const columns = [
    {
      name: "llamada_id",
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
              to={"/actividades/llamadas/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "tipo",
      label: "Tipo",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "estado",
      label: "Estado",
      options: {
        filter: true,
        filterType: "textField",
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
                  to={"/actividades/llamadas/editar/" + tableMeta.rowData[0]}
                  className="button is-link is-outlined is-normal"
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={solid("pen-to-square")} />
                  </span>
                </NavLink>
              </p>
              <p className="control">
                <NavLink
                  to={"/actividades/llamadas/eliminar/" + tableMeta.rowData[0]}
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
        to="/actividades/llamadas/nuevo"
        className={classNameButton2}
      >
        <span>Crear Nuevo</span>
        <span className="icon is-small">
          <FontAwesomeIcon icon={solid("plus")} />
        </span>
      </NavLink>}
      <DataTables
        title="Listado de Llamadas"
        columns={columns}
        data={llamadas}
        isLoading={isLoading}
      />
    </section>
  )
}

export default Index;