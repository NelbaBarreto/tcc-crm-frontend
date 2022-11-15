import React, { useContext } from "react";
import AppContext from "../../utils/AppContext";
import classNames from "classnames";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { handleStateCleared } from "./reducerFormularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton2 } from "./Componentes";

export const Guardar = ({ guardar, saving = false }) => {
  return (
    <div className="field mt-3">
      <div className="control">
        <button
          type="submit"
          className={classNames(`${classNameButton2} float-right`,
            { "is-loading": saving })}
          disabled={saving}
          onClick={e => guardar(e)}
        >
          <span>Guardar</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("floppy-disk")} />
          </span>
        </button>
      </div>
    </div>
  );
}

export const Volver = ({ navigate }) => {
  const { dispatch } = useContext(AppContext);

  const volver = e => {
    e.preventDefault();
    handleStateCleared(dispatch);
    navigate(-1);
  }

  return (
    <button
      className={classNameButton2}
      onClick={e => volver(e)}
    >
      <span>Volver</span>
      <span className="icon is-small">
        <FontAwesomeIcon icon={solid("arrow-left")} />
      </span>
    </button>
  )
};

export const Eliminar = ({ eliminar }) => {
  return (
    <button
      className="button font-semibold shadow-lg text-deep-purple-800 hover:text-white focus:text-white
      hover:bg-deep-purple-700 bg-deep-purple-100"
      onClick={e => eliminar(e)}
    >
      <span>Eliminar</span>
    </button>
  )
};
