import React from "react";
import classNames from "classnames";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNameButton2 } from "./Componentes";

export const Guardar = ({ guardar, saving = false, label = "Guardar", disabled }) => {
  return (
    <div className="field mt-3">
      <div className="control">
        <button
          type="submit"
          className={classNames(`${classNameButton2} float-right`,
            { "is-loading": saving })}
          disabled={saving || disabled}
          onClick={e => guardar(e)}
        >
          <span>{label}</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={solid("floppy-disk")} />
          </span>
        </button>
      </div>
    </div>
  );
}

export const Volver = ({ navigate }) => {
  return (
    <button
      className={classNameButton2}
      onClick={(e) => {e.preventDefault(); navigate(-1)}}
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
      className={`${classNameButton2} float-right`}
      onClick={e => eliminar(e)}
    >
      <span>Eliminar</span>
      <span className="icon is-small">
        <FontAwesomeIcon icon={solid("trash")} />
      </span>
    </button>
  )
};
