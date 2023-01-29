import React from "react";
import DataTables from "../../DataTables";
import classNames from "classnames";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton1, classNameButton2 } from "../../formulario/Componentes";
import { useQuery } from "react-query";
import { getCasos } from "../../../api/casos";
import { NavLink } from "react-router-dom";

const Index = ({ lead_id }) => {
  const {
    data: casos,
    isLoading
  } = useQuery(["casos", lead_id], () => getCasos({ lead_id }));

  const columns = [
    {
      name: "caso_id",
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
              to={"/soporte/casos/" + tableMeta.rowData[0]}
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
      name: "tipo",
      label: "Tipo",
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
              <NavLink
                to={"/admin/empleados/" + value.usuario_id}
                className="underline text-blue-900"
              >
                {value.nom_usuario}
              </NavLink>
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
            <div className="field is-grouped">
              <div className="control">
                <NavLink
                  to={"/soporte/casos/editar/" + tableMeta.rowData[0]}
                  className={classNameButton1}
                >
                  Editar
                </NavLink>
              </div>
              <div className="control">
                <NavLink
                  to={"/soporte/casos/eliminar/" + tableMeta.rowData[0]}
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
    <section className={classNames("w-full m-auto", { "section": !lead_id })}>
      {!lead_id && <NavLink
        to="/soporte/casos/nuevo"
        className={classNameButton2}
      >
        <span>Crear Nuevo</span>
        <span className="icon is-small">
          <FontAwesomeIcon icon={solid("plus")} />
        </span>
      </NavLink>}
      <DataTables
        title="Listado de Casos"
        columns={columns}
        data={casos}
        isLoading={isLoading}
      />
    </section>
  )
}

export default Index;