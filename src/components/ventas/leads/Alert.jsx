import React, { useEffect, useContext, useState } from "react";
import Modal from "react-modal";
import AppContext from "../../../utils/AppContext";
import classNames from "classnames";
import useToken from "../../../utils/useToken";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { createContacto } from "../../../api/contactos";
import { createOportunidad } from "../../../api/oportunidades";
import { createLead, editLead } from "../../../api/leads";
import { Checkbox, Input } from "../../formulario/Componentes";
import { handleDispatch, handleDispatchEdit } from "../../formulario/reducerFormularios";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CONVERTIR_LEAD = "leadConvertido";

const Alert = ({ manageModal, accion = "editar" }) => {
  const { state: { leadConvertido, lead, persona, direcciones, telefonos }, dispatch, state } = useContext(AppContext);
  const { modalIsOpen, setModalIsOpen } = manageModal;
  const [action, setAction] = useState({});
  const navigate = useNavigate();
  const currentUser = useToken().usuario;
  let nuevoLead;

  const crearContacto = async () => {
    const auditoria = { usu_insercion: currentUser.nom_usuario, usu_modificacion: currentUser.nom_usuario };

    const nuevoContacto = {
      persona_id: lead.persona_id || nuevoLead.persona_id,
      origen: lead.origen,
      ...auditoria
    };

    try {
      return await createContacto(nuevoContacto);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  const crearOportunidad = async nuevoContacto => {
    const auditoria = { usu_insercion: currentUser.nom_usuario, usu_modificacion: currentUser.nom_usuario };
    const nuevaOportunidad = {
      contacto_id: nuevoContacto.contacto_id,
      estado: "Abierto",
      curso_id: lead.curso_id,
      nombre: leadConvertido.nombreOportunidad,
      campana_id: leadConvertido.campana_id,
      ...auditoria
    };

    try {
      return await createOportunidad(nuevaOportunidad);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  const editarLead = async () => {
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };
    try {
      await editLead(lead.lead_id, {
        ...lead,
        estado: "Convertido",
        ...auditoria,
        persona: { ...persona, direcciones, telefonos, ...auditoria }
      });
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  const crearLead = async () => {
    const auditoria = { usu_insercion: currentUser.nom_usuario, usu_modificacion: currentUser.nom_usuario };

    try {
      nuevoLead = await createLead({
        ...lead,
        ...auditoria,
        persona: { ...persona, direcciones, telefonos, ...auditoria }
      });
      handleDispatch(dispatch, "persona_id", nuevoLead.persona_id, "lead")
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  const confirmar = async e => {
    e.preventDefault();
    let url = "ventas/oportunidades";
    let nuevoContacto;
    let nuevaOportunidad;
    setAction({ ...action, saving: true });

    if (accion === "crear") {
      await crearLead();
    };

    nuevoContacto = await crearContacto();
    url = `/ventas/contactos/${nuevoContacto.contacto_id}`;
    if (leadConvertido?.oportunidad) {
      nuevaOportunidad = await crearOportunidad(nuevoContacto);
      url = `/ventas/oportunidades/${nuevaOportunidad.oportunidad_id}`;
    }

    if (accion === "editar") {
      await editarLead();
    };

    setAction({ saving: false, error: false, message: "Lead convertido exitosamente." });
    setTimeout(() => navigate(url), 2000);
  }

  const cancelar = e => {
    e.preventDefault();
    setModalIsOpen(false);
  }

  useEffect(() => {
    handleDispatchEdit(dispatch, {
      oportunidad: false,
      nombreOportunidad: "",
    }, CONVERTIR_LEAD);
  }, []);

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Convertir Lead"
      ariaHideApp={false}
    >
      <>
        <div className="text-lg">
          <h5 className="title is-5 text-center">Convertir Lead</h5>
          {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
          <div className="my-3 bg-gray-300 h-[1px]"></div>
          Convertir este lead y crear los siguientes registros:<br />
          <Checkbox
            label="Contacto"
            disabled={true}
            defaultValue={true}
          />
          <Checkbox
            name="oportunidad"
            label="Oportunidad"
            value={leadConvertido?.oportunidad || false}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.checked, CONVERTIR_LEAD)}
          />
          {leadConvertido?.oportunidad ?
            <Input
              name="nombreOportunidad"
              label="Nombre Nueva Oportunidad*"
              value={leadConvertido?.nombreOportunidad || ""}
              onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CONVERTIR_LEAD)}
            /> : null}
        </div>
        <div className="field is-grouped mt-3">
          <p className="control">
            <button
              onClick={confirmar}
              disabled={(leadConvertido?.oportunidad && !leadConvertido.nombreOportunidad)}
              className={classNames("button is-success is-outlined",
                { "is-loading": action.saving })}
            >
              Continuar
            </button>
          </p>
          <p className="control">
            <button
              className="button is-danger is-outlined"
              onClick={cancelar}
              disabled={action.saving}
            >
              Cancelar
            </button>
          </p>
        </div>
      </>
    </Modal>
  )
}

export default Alert;