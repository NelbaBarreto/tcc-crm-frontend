import React from "react";
import { useQuery } from "react-query";
import { getUsuarios } from "../../api/usuarios";

const CrearUsuario = () => {
  const {
    data: usuarios,
    error,
    isLoading
  } = useQuery(["usuarios"], getUsuarios);

  return (
    <div>
      {isLoading ? <p>Cargando...</p> : 
        usuarios.data.map(usuario => {
        return <li>{usuario.nom_usuario}</li>
      })}
    </div>
  );
}

export default CrearUsuario;