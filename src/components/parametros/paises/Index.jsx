import React from "react";
import DataTables from "../../DataTables";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton1 } from "../../formulario/Componentes";
import { useQuery } from "react-query";
import { getPaises, deletePais } from "../../../api/paises";
import { NavLink } from "react-router-dom";

const Index = () => {
  const {
    data: paises,
    isLoading
  } = useQuery(["paises"], getPaises);

  const confirmDelete = async rowData => {
    if (window.confirm(`¿Está seguro de que desea eliminar el registro? (País=${rowData[1]})`) == true) {
      await deletePais(rowData[0]);
    }
  }

  const columns = [
    {
      name: "pais_id",
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
              to={"/parametros/paises/" + tableMeta.rowData[0]}
              className="underline text-blue-900"
            >
              {value}
            </NavLink>
          )
        }
      }
    },
    {
      name: "nom_corto",
      label: "Nombre Corto",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      }
    },
    {
      name: "cod_telefono",
      label: "Código de País",
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
                <button 
                  className={classNameButton1}
                >
                  Editar
                </button>
              </div>
              <div className="control">
                <button 
                  className={classNameButton1}
                  onClick={() => confirmDelete(tableMeta.rowData)}
                >
                  Eliminar
                </button>
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
          to="/parametros/paises/nuevo"
          className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
        >
          <span>Crear Nuevo</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("plus")} />
          </span>
        </NavLink>
        <DataTables
          title="Listado de Países"
          columns={columns}
          data={paises}
          isLoading={isLoading}
        />
      </section>
    </div>
  )
}

export default Index;