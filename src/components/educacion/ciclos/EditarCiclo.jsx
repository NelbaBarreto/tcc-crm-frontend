/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Input, TextArea, Datepicker } from "../../formulario/Componentes";
import { getCiclo, editCiclo } from "../../../api/ciclos";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CURSO = "ciclo";

const DatosCiclo = ({ ciclo, dispatch }) => {

  return (
    <Seccion titulo="Datos del Ciclo">
      <div className="columns">
        <div className="column">
          <Datepicker
            label="Fecha de Inicio"
            selected={ciclo?.fec_inicio || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, CURSO)}
          />
        </div>
        <div className="column">
          <Datepicker
            label="Fecha Fin"
            selected={ciclo?.fec_fin || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_fin", fecha, CURSO)}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Input
            name="nivel"
            label="Nivel"
            value={ciclo?.nivel || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CURSO)}
          />
          <TextArea
            name="detalles"
            label="Más Información"
            value={ciclo?.descripcion || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CURSO)}
          />
        </div>
      </div>
    </Seccion >
  );
};

const EditarCiclo = () => {
  const { state: { ciclo }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: currentCiclo,
    isFetching,
  } = useQuery(["ciclo", id], () => getCiclo(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching) {
      handleDispatchEdit(dispatch, currentCiclo, CURSO);
    }
  }, [isFetching]);

  const editar = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await editCiclo(ciclo.ciclo_id, { ...ciclo });
      setAction({ saving: false, error: false, message: "Ciclo editado exitosamente." });
      setTimeout(() => navigate("/educacion/ciclos"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Editar Ciclo
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosCiclo ciclo={ciclo} dispatch={dispatch} />
          <Guardar saving={action.saving} guardar={editar} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarCiclo;