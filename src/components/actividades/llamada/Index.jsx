import React from "react";
import DataTables from "../../DataTables";
import classNames from "classnames";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton1, classNameButton2 } from "../../formulario/Componentes";
import { useQuery } from "react-query";
import { getLlamadas } from "../../../api/llamadas";
import { NavLink } from "react-router-dom";

const Index = ({ lead_id }) => {
  const {
    data: llamadas,
    isLoading
  } = useQuery(["llamadas", lead_id], () => getLlamadas({ lead_id }));

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
        customBodyRender: (value, tableMeta) => {
          return (
            <NavLink
              to={"/actividades/llamadas/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
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
      name: "estado",
      label: "Estado",
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
        customBodyRender: (_value, tableMeta) => {
          return (
            <div className="field is-grouped">
              <div className="control">
                <NavLink
                  to={"/actividades/llamadas/editar/" + tableMeta.rowData[0]}
                  className={classNameButton1}
                >
                  Editar
                </NavLink>
              </div>
              <div className="control">
                <NavLink
                  to={"/actividades/llamadas/eliminar/" + tableMeta.rowData[0]}
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
    <section className={classNames("w-full m-auto", { "section": !lead_id })}>
      {!lead_id && <NavLink
        to="/actividades/llamadas/nuevo"
        className={classNameButton2}
      >
        <span>Crear Nuevo</span>
        <span className="icon is-small">
          <FontAwesomeIcon icon={solid("plus")} />
        </span>
      </NavLink>}
      <DataTables
        title="Listado de Llamadas"
        columns={columns}
        data={llamadas}
        isLoading={isLoading}
      />
    </section>
  )
}

export default Index;