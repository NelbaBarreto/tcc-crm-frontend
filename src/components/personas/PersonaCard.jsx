import React from "react";
import { DateFormat } from "../formulario/Componentes";
import Seccion from "../formulario/Seccion";

const DatosPersona = ({ persona }) => {
  return (
    <div className="py-5">
      <div className="columns">
        <div className="column is-one-quarter">
          Cliente:
        </div>
        <div className="column">
          {persona.nombre}
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-quarter">
          Correo:
        </div>
        <div className="column">
          {persona.email}
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-quarter">
          Teléfono:
        </div>
        <div className="column">
          0962186578
        </div>
      </div>
    </div>
  )
}

// const PersonaCard = ({ persona }) => {
//   return (
//     <div className="card overflow-hidden">
//       <div className="card-content">
//         <div className="media">
//           <div className="media-left">
//             <figure className="image is-48x48">
//               <img
//                 className="is-rounded"
//                 src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
//                 alt="Foto de perfil de la persona"
//               />
//             </figure>
//           </div>
//           <div className="media-content">
//             <p className="title is-4">{persona.nombre}</p>
//             <p className="subtitle is-6 text-gray-400">Empleado</p>
//           </div>
//         </div>

//         <div className="content flex">
//           <DatosPersona persona={persona} />
//         </div>
//       </div>
//     </div>
//   );
// }

const PersonaCard = ({ persona }) => {
  return (
    <div >
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-4 rounded-md shadow-lg mt-2 border-t-4 border-purple-800">
              <div className="image overflow-hidden">
                <img className="h-auto w-full mx-auto"
                  src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
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
                  <div className="px-4 py-2 font-semibold">Sexo</div>
                  <div className="px-4 py-2"></div>
                </div>
                <div className="column">
                  <div className="px-4 py-2 font-semibold">Fecha de Nacimiento</div>
                  <div className="px-4 py-2"></div>
                </div>
              </div>
              <button
                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Más Información
              </button>
            </Seccion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonaCard;