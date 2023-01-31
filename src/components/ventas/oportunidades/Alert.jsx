import React from "react";
import Modal from "react-modal";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const Alert = ({ manageModal, guardar }) => {
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

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Confirmar Oportunidad Ganada"
      ariaHideApp={false}
    >
      <>
        <div class="text-lg">
          <h5 className="title is-5 text-center">Confirmar Oportunidad Ganada</h5>
          <div className="my-3 bg-gray-300 h-[1px]"></div>
          ¿Estás seguro de que quieres marcar esta oportunidad como ganada?<br />Esta acción no se puede deshacer.
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