import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getContactos } from "../../../api/contactos";
import { NavLink } from "react-router-dom";
import { classNameButton1, classNameButton2 } from "../../formulario/Componentes";

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
                to={"/ventas/contactos/" + tableMeta.rowData[0]}
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
      name: "persona.email",
      label: "Email",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: (value) => {
          if (value) {
            return (
              <a 
                className="text-blue-900" 
                href={`mailto:${value}`}
              >
                {value}
              </a>
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
      name: "organizacion",
      label: "Organización",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: value => {
          if (value) {
            return (
              <NavLink
                to={"/ventas/organizaciones/" + value.organizacion_id}
                className="underline text-blue-900"
              >
                {value.persona?.nombre}
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
        customBodyRenderLite: (dataIndex, _rowIndex) => {
          return (
            <button
              className={classNameButton1}
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
          className={classNameButton2}
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