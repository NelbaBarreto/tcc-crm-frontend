import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

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

const ModalUsuario = ({ setIsOpen, modalIsOpen }) => {
  let subtitle;

  const openModal = e => {
    e.preventDefault();
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync"d and can be accessed.
    subtitle.style.color = "#f00";
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const DatosUsuario = () => {
    return (
      <section className="section">
        <div className="field">
          <label className="label">Nombre de Usuario</label>
          <div className="control">
            <input className="input shadow-lg" type="text" />
          </div>
        </div>
        <div className="field">
          <label className="label">Contraseña</label>
          <div className="control">
            <input className="input shadow-lg" type="password" />
          </div>
        </div>
      </section>
    )
  };

  return (
    <div>
      <div className="field mt-3">
        <div className="control">
          <button
            onClick={openModal}
            className="button font-semibold shadow-lg hover:bg-gray-200 border-lila-700 text-lila-800"
          >
            <span className="icon">
              <FontAwesomeIcon icon={solid("user")} />
            </span>
            <span>Perfil del Usuario</span>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Datos del usuario"
      >
        <button className="float-right" onClick={closeModal}>
          <span className="icon">
            <FontAwesomeIcon icon={solid("xmark")} />
          </span>
        </button>
        <DatosUsuario />
      </Modal>
    </div>
  );
}

export default ModalUsuario;