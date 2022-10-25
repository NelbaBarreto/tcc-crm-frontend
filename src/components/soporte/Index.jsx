import React from "react";
import DataTables from "../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getCasos } from "../../api/casos";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: casos,
    isLoading
  } = useQuery(["casos"], getCasos);

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
              to={"/soporte/cursos/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "descripcion",
      label: "Descripción",
      options: {
        filter: true,
        filterType: "textField",
        sort: false,
      }
    },
    {
      name: "prioridad",
      label: "Prioridad",
      options: {
        filter: true,
        filterType: "dropdown",
        sort: true,
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
      name: "origen",
      label: "Origen",
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
        customBodyRenderLite: (dataIndex, _rowIndex) => {
          return (
            <button
              className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700"
              onClick={() => console.log(casos[dataIndex])}
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
          to="/soporte/nuevo"
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Casos"
          columns={columns}
          data={casos}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;