import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getTareas } from "../../../api/tareas";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: tareas,
    isLoading
  } = useQuery(["tareas"], getTareas);

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
      name: "prioridad",
      label: "Prioridad",
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
              onClick={() => console.log(tareas[dataIndex])}
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
          to="/actividades/tareas/nuevo"
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Tareas"
          columns={columns}
          data={tareas}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;