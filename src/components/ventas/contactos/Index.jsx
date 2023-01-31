import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import { getContactos } from "../../../api/contactos";
import { NavLink } from "react-router-dom";
import { classNameButton2 } from "../../formulario/Componentes";

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
                  to={"/ventas/contactos/editar/" + tableMeta.rowData[0]}
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