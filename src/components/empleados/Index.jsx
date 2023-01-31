import React from "react";
import DataTables from "../DataTables";
import { classNameButton2 } from "../formulario/Componentes";
import { format, parseISO } from "date-fns";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getEmpleados } from "../../api/empleados";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: empleados,
    isLoading
  } = useQuery(["empleados"], getEmpleados);

  const columns = [
    {
      name: "empleado_id",
      options: {
        display: "none"
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
              to={"/admin/empleados/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "cargo",
      label: "Cargo",
      options: {
        filter: true,
        filterType: "dropdown",
        sort: true,
      }
    },
    {
      name: "activo",
      label: "Estado",
      options: {
        filter: true,
        filterType: "dropdown",
        sort: true,
        customBodyRender: (value) => {
          if (value) {
            return <span className="tag is-light is-success font-bold">Activo</span>
          } else {
            return <span className="tag is-light is-danger font-bold">Inactivo</span>
          }
        },
      }
    },
    {
      name: "usuario.nom_usuario",
      label: "Usuario",
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
                  to={"/admin/empleados/editar/" + tableMeta.rowData[0]}
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
          to="/admin/empleados/nuevo"
          className={classNameButton2}
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Empleados"
          columns={columns}
          data={empleados}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;