import React from "react";
import Seccion from "../formulario/Seccion";
import { TextView } from "../formulario/Componentes";

const Telefonos = ({ telefonos }) => {
  const MostrarTelefonos = () => {
    return (
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Número</th>
            <th>Tipo</th>
            <th>Comentario</th>
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
            <th>Referencia</th>
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
                <td>{direccion.referencia}</td>
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

const DatosPersona = ({ persona = {} }) => {
  return (
    <>
      <Seccion titulo="Datos Personales">
        <div className="columns">
          <div className="column">
            <TextView label="Nombre" value={persona.nombre} />
          </div>
          <div className="column">
            <TextView label="Email" value={persona.email} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <TextView label="Tipo de Documento" value={persona.tip_documento} />
          </div>
          <div className="column">
            <TextView label="Número de Documento" value={persona.nro_documento} />
          </div>
        </div>
      </Seccion>
      <Telefonos
        telefonos={persona.telefonos}
      />
      <Direcciones
        direcciones={persona.direcciones}
      />
    </>
  )
}
export default DatosPersona;