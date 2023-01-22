import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getOrganizaciones } from "../../../api/organizaciones";
import { NavLink } from "react-router-dom";
import { classNameButton1, classNameButton2 } from "../../formulario/Componentes";

const Index = () => {
  const {
    data: organizaciones,
    isLoading
  } = useQuery(["organizaciones"], getOrganizaciones);

  const columns = [
    {
      name: "organizacion_id",
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
                to={"/ventas/organizaciones/" + tableMeta.rowData[0]}
                className="underline text-blue-900"
              >
                {value.nombre}
              </NavLink>
            )
          }
        }
      }
    },
    {
      name: "website",
      label: "Website",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: value => {
          if (value) {
            return (
              <a 
                className="underline text-blue-900" 
                href={value}
                target="_blank"
                rel="noreferrer"
              >
                {value}
              </a>
            )
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
              className={classNameButton1}
              onClick={() => console.log(organizaciones[dataIndex])}
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
          to="/ventas/organizaciones/nuevo"
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Organizaciones"
          columns={columns}
          data={organizaciones}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;