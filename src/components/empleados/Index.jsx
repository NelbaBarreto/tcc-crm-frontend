import React from "react";
import DataTables from "../DataTables";
import { useQuery } from "react-query";
import { getEmpleados } from "../../api/empleados";

const Index = () => {
  const {
    data: usuarios,
    isLoading
  } = useQuery(["usuarios"], getEmpleados);

  const columns = [
    {
      name: "persona.nombre",
      label: "Nombre",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
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
            <button className="button is-dark">
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
        <DataTables columns={columns} data={usuarios} />
      </section>
    </div>
  )
}

export default Index;