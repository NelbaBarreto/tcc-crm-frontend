import React from "react";
import DataTables from "../../DataTables";
import { format, parseISO } from "date-fns";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button1 } from "../../formulario/Componentes";
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
        customBodyRender: value => value ?  format(parseISO(value), "dd/MM/yyyy") : ""
      }
    },
    {
      name: "fec_fin",
      label: "Fecha Fin",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        customBodyRender: value => value ?  format(parseISO(value), "dd/MM/yyyy") : ""
      }
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (_dataIndex, _rowIndex) => {
          return (
            <div className="field is-grouped">
              <div className="control">
                <Button1
                >
                  Editar
                </Button1>
              </div>
              <div className="control">
                <Button1
                >
                  Eliminar
                </Button1>
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
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
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