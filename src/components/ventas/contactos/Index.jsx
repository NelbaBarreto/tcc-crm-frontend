import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getContactos } from "../../../api/contactos";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: contactos,
    isLoading
  } = useQuery(["contactos"], getContactos);

  const columns = [
    {
      name: "contacto_id",
      options: {
        display: "excluded",
        filter: false
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
              onClick={() => console.log(contactos[dataIndex])}
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
          to="/ventas/contactos/nuevo"
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Contactos"
          columns={columns}
          data={contactos}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;