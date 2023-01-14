import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                to={"/ventas/leads/" + tableMeta.rowData[0]}
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
      name: "estado",
      label: "Estado",
      options: {
        filter: true,
        filterType: "dropdown",
        sort: true,
      }
    },
    {
      name: "campana",
      label: "Campaña",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: value => {
          if (value) {
            return (
              <NavLink
                to={"/marketing/campanas/" + value.campana_id}
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
      name: "origen",
      label: "Origen",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "curso",
      label: "Curso/Interés",
      options: {
        filter: true,
        filterType: "dropdown",
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
      name: "usu_asignado",
      label: "Usuario Asignado",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: value => {
          if (value) {
            return (
              <NavLink
                to={"/admin/usuarios/" + value.usuario_id}
                className="underline text-blue-900"
              >
                {value.nom_usuario}
              </NavLink>
            );
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
                  to={"/ventas/leads/editar/" + tableMeta.rowData[0]}
                  className={classNameButton2}
                >
                  Editar
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
          to="/ventas/leads/nuevo"
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
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