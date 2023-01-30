import React from "react";
import Modal from "react-modal";

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

const Alert = ({ manageModal, crear}) => {
  const {modalIsOpen, setModalIsOpen} = manageModal;

  const confirmar = e => {
    e.preventDefault();
    setModalIsOpen(false);
    crear();
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
    >
      <>
        <div class="notification text-lg font-semibold">
          Estás seguro de que quieres marcar esta oportunidad como ganada?<br/>Esta acción no se puede deshacer.
        </div>
        <div className="field is-grouped">
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