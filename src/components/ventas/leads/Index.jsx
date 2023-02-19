import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import { getLeads } from "../../../api/leads";
import { NavLink } from "react-router-dom";
import { classNameButton2 } from "../../formulario/Componentes";

const Index = () => {
  const {
    data: leads,
    isLoading
  } = useQuery(["leads"], getLeads);

  const columns = [
    {
      name: "lead_id",
      options: {
        display: "excluded",
        filter: false
      }
    },
    {
      name: "persona.nombre",
      label: "NOMBRE",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value, tableMeta) => {
          if (value) {
            return (
              <NavLink
                to={"/ventas/leads/" + tableMeta.rowData[0]}
                className="underline text-blue-900"
              >
                {value}
              </NavLink>
            );
          } else {
            return null;
          }
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
      name: "origen",
      label: "ORIGEN",
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
        sort: false,
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
      name: "usu_asignado.nom_usuario",
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
                  to={"/ventas/leads/editar/" + tableMeta.rowData[0]}
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
          to="/ventas/leads/nuevo"
          className={classNameButton2}
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Leads"
          columns={columns}
          data={leads}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;