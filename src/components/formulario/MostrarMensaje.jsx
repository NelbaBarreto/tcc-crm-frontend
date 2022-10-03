import React from "react";
import classNames from "classnames";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MostrarMensaje = ({ mensaje, error = false }) => {
  return (
    <div className={classNames("notification is-light", { "is-danger": error, "is-success": !error })}>
      <span className="icon is-small mr-2">
        {error ? <FontAwesomeIcon icon={solid("triangle-exclamation")} /> : 
          <FontAwesomeIcon icon={solid("circle-check")} />}
      </span>
      <span>{mensaje}</span>
    </div>
  );
};

export default MostrarMensaje;