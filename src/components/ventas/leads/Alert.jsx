import React, { useEffect, useContext, useState } from "react";
import Modal from "react-modal";
import AppContext from "../../../utils/AppContext";
import { Checkbox, Input } from "../../formulario/Componentes";
import { handleDispatch, handleDispatchEdit } from "../../formulario/reducerFormularios";

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

const CONVERTIR_LEAD = "convertirLead";

const Alert = ({ manageModal, guardar }) => {
  const { state: { oportunidad, convertirLead }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const { modalIsOpen, setModalIsOpen } = manageModal;

  const confirmar = e => {
    e.preventDefault();
    setModalIsOpen(false);
    guardar();
  }

  const cancelar = e => {
    e.preventDefault();
    setModalIsOpen(false);
  }

  useEffect(() => {
    handleDispatchEdit(dispatch, {
      oportunidad: true,
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
        <div class="text-lg">
          <h5 className="title is-5 text-center">Convertir Lead</h5>
          <div className="my-3 bg-gray-300 h-[1px]"></div>
          Convertir este lead y crear los siguientes registros:<br/>
          <Checkbox
            label="Contacto"
            disabled={true}
            value={true}
          />
          <Checkbox
            name="oportunidad"
            label="Oportunidad"
            value={convertirLead?.oportunidad || false}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.checked, CONVERTIR_LEAD)}
          />
          {convertirLead?.oportunidad ?
            <Input
              name="nombreOportunidad"
              label="Nombre Nueva Oportunidad*"
              value={convertirLead?.nombreOportunidad || ""}
              onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CONVERTIR_LEAD)}
            /> : null}
        </div>
        <div className="field is-grouped mt-3">
          <p className="control">
            <button
              className="button is-success is-outlined"
              onClick={confirmar}
            >
              Continuar
            </button>
          </p>
          <p className="control">
            <button
              className="button is-danger is-outlined"
              onClick={cancelar}
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