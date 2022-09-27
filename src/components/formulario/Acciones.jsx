import React from "react";
import classNames from "classnames";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Guardar = ({ guardar, saving = false }) => {
  return (
    <div className="field mt-3">
      <div className="control">
        <button
          className={classNames("button float-right font-semibold shadow-lg text-white hover:text-white focus:text-white hover:bg-deep-purple-700 focus:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700",
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
  return (
    <button
      className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
      hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700"
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
      className="button font-semibold shadow-lg text-deep-purple-800 hover:text-white focus:text-white
      hover:bg-deep-purple-700 bg-deep-purple-100"
      onClick={e => eliminar(e)}
    >
      <span>Eliminar</span>
    </button>
  )
};