import React from "react";
import classNames from "classnames";

const MostrarMensaje = ({ mensaje, error = false }) => {
  return (
    <div className={classNames("notification is-light", { "is-danger": error, "is-success": !error })}>
      {mensaje}
    </div>
  );
};

export default MostrarMensaje;