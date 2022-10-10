import React from "react";
import { Titulo2 } from "../formulario/Titulo";

const Seccion = ({ titulo, children }) => {
  return (
    <section className="bg-white p-4 rounded-md shadow-lg mt-2">
      <Titulo2>{titulo}</Titulo2>
      {children}
    </section>
  );
}

export default Seccion;