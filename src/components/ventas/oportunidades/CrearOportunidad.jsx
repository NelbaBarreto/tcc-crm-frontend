import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { createOportunidad, getEtapas } from "../../../api/oportunidades";
import { getLeads } from "../../../api/leads";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const OPORTUNIDAD = "oportunidad";

const DatosOportunidad = ({ oportunidad, dispatch }) => {
  const [select, setSelect] = useState({ etapa: "", usu_asignado: "" });

  const {
    data: etapasOportunidades,
    etapasLoading
  } = useQuery(["etapasOportunidades"], getEtapas);

  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: leads,
    leadsLoading
  } = useQuery(["leads"], getLeads);

  const opcionesEtapas = etapasLoading || !etapasOportunidades ? [] :
    etapasOportunidades.map(etapa => ({ value: etapa, label: etapa }));

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  const opcionesLeads = leadsLoading || !leads ? [] :
    leads.map(lead => ({ value: lead.lead_id, label: lead.persona.nombre }));    

  return (
    <Seccion titulo="Datos de la Oportunidad">
      <div className="columns">
        <div className="column">
          <Input 
            name="nombre"
            label="Nombre"
            value={oportunidad?.nombre || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, OPORTUNIDAD)}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Etapa"
            value={select.etapa}
            options={opcionesEtapas}
            onChange={e => {
              handleDispatch(dispatch, "etapa", e?.value, OPORTUNIDAD);
              setSelect({ ...select, etapa: e })
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Input 
            name="valor"
            label="Valor"
            value={oportunidad?.valor || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, OPORTUNIDAD)}
          />
        </div>         
        <div className="column">
          <Dropdown
            label="Usuario Asignado"
            value={select.usu_asignado}
            options={opcionesUsuarios}
            onChange={e => {
              handleDispatch(dispatch, "usu_asignado_id", e?.value, OPORTUNIDAD);
              setSelect({ ...select, usu_asignado: e })
            }}
          />
        </div>     
      </div>      
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Lead"
            value={select.lead}
            options={opcionesLeads}
            onChange={e => {
              handleDispatch(dispatch, "lead_id", e?.value, OPORTUNIDAD);
              setSelect({ ...select, lead: e })
            }}
          />
        </div>        
        <div className="column">
          <TextArea 
            label="Descripción"
            name="descripcion"
            value={oportunidad?.descripcion || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, OPORTUNIDAD)}            
          />
        </div>
      </div>
    </Seccion>
  );
};

const CrearOportunidad = () => {
  const {state : { oportunidad }, dispatch} = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createOportunidad(oportunidad);
      setAction({ saving: false, error: false, message: "Oportunidad creada exitosamente." });
      setTimeout(() => navigate("/ventas/oportunidades"), 3000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Oportunidad
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosOportunidad 
            oportunidad={oportunidad}
            dispatch={dispatch} 
          />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearOportunidad;