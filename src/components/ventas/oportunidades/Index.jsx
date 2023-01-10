import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getOportunidades } from "../../../api/oportunidades";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: oportunidades,
    isLoading
  } = useQuery(["oportunidades"], getOportunidades);

  const columns = [
    {
      name: "oportunidad_id",
      options: {
        display: "excluded",
        filter: false
      }
    },
    {
      name: "nombre",
      label: "Nombre",
      options: {
        filter: true,
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
      name: "valor",
      label: "Valor",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "etapa",
      label: "Etapa",
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
        customBodyRenderLite: (dataIndex, _rowIndex) => {
          return (
            <button
              className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700"
              onClick={() => console.log(oportunidades[dataIndex])}
            >
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
        <NavLink
          to="/ventas/oportunidades/nuevo"
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
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