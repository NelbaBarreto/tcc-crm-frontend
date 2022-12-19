import React from "react";
import { DateFormat } from "../formulario/Componentes";
import Seccion from "../formulario/Seccion";

const Telefonos = ({ telefonos }) => {
  const MostrarTelefonos = () => {
    return (
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Número</th>
            <th>Tipo</th>
            <th>Comentario</th>
            <th>Principal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {telefonos?.map((telefono, idx) => {
            return (
              <tr key={idx}>
                <td>{telefono.numero}</td>
                <td>{telefono.tipo}</td>
                <td>{telefono.comentario}</td>
                <td>{telefono.principal ? "Sí" : "No"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }

  return (
    <Seccion titulo="Teléfonos">
      <MostrarTelefonos />
    </Seccion>
  );
}

const Direcciones = ({ direcciones }) => {
  const MostrarDirecciones = () => {
    return (
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Calle 1</th>
            <th>Calle 2</th>
            <th>Código Postal</th>
            <th>País</th>
            <th>Ciudad</th>
            <th>Referencia</th>
            <th>Principal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {direcciones?.map((direccion, idx) => {
            return (
              <tr key={idx}>
                <td>{direccion.calle_1}</td>
                <td>{direccion.calle_2}</td>
                <td>{direccion.cod_postal}</td>
                <td>{direccion.pais}</td>
                <td>{direccion.ciudad}</td>
                <td>{direccion.referencia}</td>
                <td>{direccion.principal ? "Sí" : "No"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }

  return (
    <Seccion titulo="Direcciones">
      <MostrarDirecciones />
    </Seccion>
  );
}

const DatosPersona = ({ persona }) => {
  return (
    <div className="w-full md:w-9/12 mx-2 h-64">
      <Seccion titulo="Datos Personales">
        <div className="text-gray-700">
          <div className="columns">
            <div className="column">
              <div className="px-4 py-2 font-semibold">Nombre</div>
              <div className="px-4 py-2">{persona.nombre}</div>
            </div>
            <div className="column">
              <div className="px-4 py-2 font-semibold">Email</div>
              <div className="px-4 py-2">
                <a className="text-blue-800" href={`mailto:${persona.email}`}>{persona.email}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="px-4 py-2 font-semibold">Número de Documento</div>
            <div className="px-4 py-2">{persona.nro_documento}</div>
          </div>
          <div className="column">
            <div className="px-4 py-2 font-semibold">Tipo de Documento</div>
            <div className="px-4 py-2">{persona.tip_documento}</div>
          </div>
        </div>
      </Seccion>
      <Telefonos telefonos={persona.telefonos} />
      <Direcciones direcciones={persona.direcciones} />
    </div>
  )
}
export default DatosPersona;