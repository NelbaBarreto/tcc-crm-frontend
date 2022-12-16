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

const PersonaCard = ({ persona }) => {
  return (
    <div className="md:flex no-wrap md:-mx-2 ">
      <div className="w-full md:w-3/12 md:mx-2">
        <div className="bg-white p-4 rounded-md shadow-lg mt-2 border-t-4 border-purple-800">
          <div className="image overflow-hidden">
            <img className="h-auto w-full mx-auto"
              src="https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w"
              alt="" />
          </div>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{persona.nombre}</h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6">Secretaria</h3>
          <ul
            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Estado</span>
              <span className="ml-auto"><span
                className="bg-green-500 py-1 px-2 rounded text-white text-sm">Activo</span></span>
            </li>
            <li className="flex items-center py-3">
              <span>Fecha de Creación</span>
              <DateFormat className="ml-auto" value={persona.fec_insercion} />
            </li>
          </ul>
        </div>
      </div>
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
    </div>
  )
}

const MostrarPersona = ({ persona }) => {
  return (
    <div className="w-full">
      <div class="container">
        <PersonaCard persona={persona} />
      </div>
    </div>
  )
}
export default MostrarPersona;