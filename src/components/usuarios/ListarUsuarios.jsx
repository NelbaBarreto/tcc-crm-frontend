import React from "react";
import { useQuery } from "react-query";
import { getUsuarios } from "../../api/usuarios";

const CrearUsuario = () => {
  const {
    data: usuarios,
    isLoading
  } = useQuery(["usuarios"], getUsuarios);

  return (
    <div>
      {isLoading ? <p>Cargando...</p> : 
        usuarios.data.map((usuario, idx) => {
        return <li key={idx}>{usuario.nom_usuario}</li>
      })}
    </div>
  );
}

export default CrearUsuario;