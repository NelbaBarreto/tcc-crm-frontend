import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button1 } from "../../formulario/Componentes";
import { useQuery } from "react-query";
import { getSucursales } from "../../../api/sucursales";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: sucursales,
    isLoading
  } = useQuery(["sucursales"], getSucursales);

  const columns = [
    {
      name: "sucursal_id",
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
              to={"/educacion/sucursales/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "calle_1",
      label: "Calle 1",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "calle_2",
      label: "Calle 2",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "pais",
      label: "País",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        // customBodyRender: (value) => {
        //   return (
        //     <NavLink
        //       to={"/parametros/paises/" + value.pais_id}
        //       className="underline text-blue-900"
        //     >
        //       {value.nombre}
        //     </NavLink>
        //   )
        // }
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
          to="/educacion/sucursales/nuevo"
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Sucursales"
          columns={columns}
          data={sucursales}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;