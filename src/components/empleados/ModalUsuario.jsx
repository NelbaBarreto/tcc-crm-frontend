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

const DatosUsuario = ({ persona, setPersona }) => {
  return (
    <section className="section">
      <div className="field">
        <label className="label">Nombre de Usuario</label>
        <div className="control">
          <input
            name="nom_usuario"
            className="input shadow-lg"
            type="text"
            value={persona.empleado.usuario.nom_usuario || ""}
            onChange={e => setPersona({ ...persona, empleado: { ...persona.empleado,  usuario: { ...persona.usuario, [e.target.name]: e.target.value } }})}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Contraseña</label>
        <div className="control">
          <input
            name="password"
            className="input shadow-lg"
            type="password"
            value={persona.empleado.usuario.password || ""}
            onChange={e => setPersona({ ...persona, empleado: { ...persona.empleado, usuario: { ...persona.empleado.usuario, [e.target.name]: e.target.value } }})}
          />
        </div>
      </div>
    </section>
  )
};

const ModalUsuario = ({ setIsOpen, modalIsOpen, persona, setPersona }) => {
  const openModal = e => {
    e.preventDefault();
    setIsOpen(true);
  }


  const closeModal = () => {
    setIsOpen(false);
  }

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
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Datos del usuario"
      >
        <button className="float-right" onClick={closeModal}>
          <span className="icon">
            <FontAwesomeIcon icon={solid("xmark")} />
          </span>
        </button>
        <DatosUsuario persona={persona} setPersona={setPersona} />
      </Modal>
    </div>
  );
}

export default ModalUsuario;