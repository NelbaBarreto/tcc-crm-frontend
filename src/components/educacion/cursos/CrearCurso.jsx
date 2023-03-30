import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import useToken from "../../../utils/useToken";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Titulo1 } from "../../formulario/Titulo";
import { Input, TextArea } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";
import { createCurso } from "../../../api/cursos";

const CURSO = "curso";

const DatosCurso = ({ curso = {}, dispatch }) => {
  return (
    <Seccion titulo="Datos del Curso">
      <Input
        name="nombre"
        label="Nombre*"
        value={curso.nombre || ""}
        onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CURSO)}
      />
      <TextArea
        name="descripcion"
        label="Descripción*"
        value={curso.descripcion || ""}
        onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CURSO)}
      />
    </Seccion>
  );
};

const CrearCurso = () => {
  const { state: { curso }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();
  const currentUser = useToken().usuario;
  
  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { usu_insercion: currentUser.nom_usuario, usu_modificacion: currentUser.nom_usuario };

    try {
        const nuevoCurso = await createCurso({
          ...curso,
          ...auditoria,
        });
  
        if (nuevoCurso.message) {
          setAction({ saving: false, error: true, message: nuevoCurso.message });
        } else {
          setAction({ saving: false, error: false, message: "Curso creado exitosamente." });
          setTimeout(() => navigate("/educacion/cursos"), 3000);
        }
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Curso
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosCurso curso={curso} dispatch={dispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearCurso;