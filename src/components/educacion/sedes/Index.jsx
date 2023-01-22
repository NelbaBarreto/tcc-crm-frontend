import React from "react";
import DataTables from "../../DataTables";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton1, classNameButton2 } from "../../formulario/Componentes";
import { useQuery } from "react-query";
import { getSedes } from "../../../api/sedes";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: sedes,
    isLoading
  } = useQuery(["sedes"], getSedes);

  const columns = [
    {
      name: "sede_id",
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
              to={"/educacion/sedes/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "direccion.calle_1",
      label: "Calle 1",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
        
      }
    },
    {
      name: "direccion.calle_2",
      label: "Calle 2",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "direccion.ciudad.nombre",
      label: "Ciudad",
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
                  to={"/educacion/sedes/editar/" + tableMeta.rowData[0]}
                  className={classNameButton1}
                >
                  Editar
                </NavLink>
              </div>
              <div className="control">
                <NavLink
                  to={"/educacion/sedes/eliminar/" + tableMeta.rowData[0]}
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
          to="/educacion/sedes/nuevo"
          className={classNameButton2}
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Sedes"
          columns={columns}
          data={sedes}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;