import React from "react";
import DataTables from "../../DataTables";
import { format, parseISO } from "date-fns";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton1, classNameButton2 } from "../../formulario/Componentes";
import { useQuery } from "react-query";
import { getCampanas } from "../../../api/campanas";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: campanas,
    isLoading
  } = useQuery(["campanas"], getCampanas);

  const columns = [
    {
      name: "campana_id",
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
              to={"/marketing/campanas/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "fec_inicio",
      label: "Fecha Inicio",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: value => value ? format(parseISO(value), "dd/MM/yyyy") : ""
      }
    },
    {
      name: "fec_fin",
      label: "Fecha Fin",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: value => value ? format(parseISO(value), "dd/MM/yyyy") : ""
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
            <div className="field is-grouped">
              <div className="control">
                <NavLink
                  to={"/marketing/campanas/editar/" + tableMeta.rowData[0]}
                  className={classNameButton1}
                >
                  Editar
                </NavLink>
              </div>
              <div className="control">
                <NavLink
                  to={"/marketing/campanas/eliminar/" + tableMeta.rowData[0]}
                  className={classNameButton1}
                >
                  Eliminar
                </NavLink>
              </div>
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
          to="/marketing/campanas/nuevo"
          className={classNameButton2}
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Campañas"
          columns={columns}
          data={campanas}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;