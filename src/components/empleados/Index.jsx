import React from "react";
import DataTables from "../DataTables";
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
        display: "excluded"
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
      name: "persona.email",
      label: "Email",
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
        customBodyRender: value => value ? "Activo" : "Inactivo",
        filter: true,
        filterType: "dropdown",
        sort: true,
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
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <button className="button is-dark" onClick={e => console.log(empleados[dataIndex])} >
              Editar
            </button>
          );
        }
      }
    },
  ];

  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Listado de Empleados</h1>
        <DataTables columns={columns} data={empleados} />
      </section>
    </div>
  )
}

export default Index;