import React from "react";

const Guardar = ({ guardar }) => {
  return (
    <div className="field mt-3">
      <div className="control">
        <button
          className="button float-right font-semibold shadow-lg text-white hover:text-white focus:text-white
         hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700"
          onClick={e => guardar(e)}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default Guardar;