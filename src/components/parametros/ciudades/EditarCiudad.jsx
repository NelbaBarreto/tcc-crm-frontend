import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input } from "../../formulario/Componentes";
import { getCiudad, editCiudad } from "../../../api/ciudades";
import { getPaises } from "../../../api/paises";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";


const CIUDAD = "ciudad";

const DatosCiudad = ({ ciudad, dispatch, manageSelect }) => {
  const { setSelect, select } = manageSelect;

  const {
    data: paises,
    paisesLoading
  } = useQuery(["paises"], getPaises);

  const opcionesPaises = paisesLoading || !paises ? [] :
    paises.map(pais => ({ value: pais.pais_id, label: pais.nombre }));

  return (
    <Seccion titulo="Datos de la Ciudad">
      <Input
        name="nombre"
        label="Nombre"
        value={ciudad?.nombre || ""}
        onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CIUDAD)}
      />

      <Dropdown
        label="Paises"
        value={select.pais}
        options={opcionesPaises}
        onChange={e => {
          handleDispatch(dispatch, "pais_id", e?.value, CIUDAD);
          setSelect({ ...select, pais: e })
        }}
      />

    </Seccion>
  );
};

const EditarCiudad = () => {
  const { state: { ciudad }, dispatch } = useContext(AppContext);
  const [select, setSelect] = useState({ pais: "" });
  const [action, setAction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: currentCiudad,
    isFetching,
  } = useQuery(["ciudad", id], () => getCiudad(id));

  useEffect(() => {
    handleStateCleared(dispatch);
    setSelect({ pais: "" });
  }, []);

  useEffect(() => {
    if (!isFetching) {
      handleDispatchEdit(dispatch, currentCiudad, CIUDAD);
      setSelect({
        pais: { label: currentCiudad.pais?.nombre, value: currentCiudad.pais?.pais_id },
      });
    }
  }, [isFetching]);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await editCiudad(ciudad.ciudad_id, { ...ciudad });
      setAction({ saving: false, error: false, message: "Ciudad editada exitosamente." });
      setTimeout(() => navigate("/parametros/ciudades"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Modificar Ciudad
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosCiudad ciudad={ciudad} dispatch={dispatch} manageSelect={{ setSelect, select }} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarCiudad;