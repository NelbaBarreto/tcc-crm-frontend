import React from "react";
import classNames from "classnames";

const Guardar = ({ guardar, saving = false }) => {
  return (
    <div className="field mt-3">
      <div className="control">
        <button
          className={classNames("button float-right font-semibold shadow-lg text-white hover:text-white focus:text-white hover:bg-deep-purple-700 focus:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700", 
            { "is-loading": saving })} 
          disabled={saving}
          onClick={e => guardar(e)}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default Guardar;