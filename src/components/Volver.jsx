import React from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Volver = ({ navigate }) => {
  return (
    <button
      className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
      hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700"
      onClick={() => navigate(-1)}
    >
      <span>Volver</span>
      <span className="icon is-small">
        <FontAwesomeIcon icon={solid("arrow-left")} />
      </span>
    </button>
  )
};

export default Volver;