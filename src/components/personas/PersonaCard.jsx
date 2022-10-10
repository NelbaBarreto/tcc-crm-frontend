import React from "react";
import { format } from "date-fns";

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

const PersonaCard = ({ persona }) => {
  return (
    <div className="card overflow-hidden">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                className="is-rounded"
                src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                alt="Foto de perfil de la persona"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{persona.nombre}</p>
            <p className="subtitle is-6 text-gray-400">Empleado</p>
          </div>
        </div>

        <div className="content flex">
          <DatosPersona persona={persona} />
        </div>
      </div>
    </div>
  );
}

export default PersonaCard;