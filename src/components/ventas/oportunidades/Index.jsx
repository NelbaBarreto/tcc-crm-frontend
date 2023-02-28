import React from "react";
import DataTables from "../../DataTables";
import classNames from "classnames";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getOportunidades } from "../../../api/oportunidades";
import { NavLink } from "react-router-dom";
import { classNameButton2 } from "../../formulario/Componentes";
import { format, parseISO } from "date-fns";

const Index = ({ contacto_id }) => {
  const {
    data: oportunidades,
    isLoading
  } = useQuery(["oportunidades", contacto_id], () => getOportunidades({ contacto_id }));

  const columns = [
    {
      name: "oportunidad_id",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      }
    },
    {
      name: "nombre",
      label: "NOMBRE",
      options: {
        filter: false,
        filterType: "textField",
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <NavLink
              to={"/ventas/oportunidades/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "estado",
      label: "ESTADO",
      options: {
        filter: true,
        filterType: "multiselect",
        sort: true,
      }
    },
    {
      name: "curso",
      label: "CURSO/INTERÉS",
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
      name: "contacto",
      label: "CONTACTO",
      options: {
        filter: true,
        filterType: "multiselect",
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
      name: "usuario.nom_usuario",
      label: "USUARIO ASIGNADO",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "fec_insercion",
      label: "FECHA DE CREACIÓN",
      options: {
        filter: true,
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
                  to={"/ventas/oportunidades/editar/" + tableMeta.rowData[0]}
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
      <section className={classNames("w-full m-auto", { "section": !contacto_id })}>
        {!contacto_id && <NavLink
          to="/ventas/oportunidades/nuevo"
          className={classNameButton2}
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>}
        <DataTables
          title="Listado de Oportunidades"
          columns={columns}
          data={oportunidades}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;