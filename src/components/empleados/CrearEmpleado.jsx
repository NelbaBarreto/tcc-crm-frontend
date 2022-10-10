import React, { useState } from "react";
import MostrarMensaje from "../formulario/MostrarMensaje";
import ModalUsuario from "../usuarios/ModalUsuario";
import CrearPersona from "../personas/CrearPersona";
import Seccion from "../formulario/Seccion";
import { Volver, Guardar } from "../formulario/Acciones";
import { Titulo1 } from "../formulario/Titulo";
import { useNavigate } from "react-router-dom";
import { createPersona } from "../../api/personas";

const DatosEmpleado = ({ persona, setPersona }) => {
  return (
    <Seccion titulo="Datos del Empleado">
      <div className="field">
        <label className="label">Activo</label>
        <div className="control">
          <input
            name="activo"
            className="checkbox shadow-lg"
            value={persona.empleado.activo || false}
            onChange={e => setPersona({ ...persona, empleado: { ...persona.empleado, [e.target.name]: e.target.checked } })}
            type="checkbox"
          />
        </div>
      </div>
    </Seccion>
  );
};

const CrearEmpleado = () => {
  const [persona, setPersona] = useState({ empleado: { usuario: {} } });
  const [state, setState] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setState({ saving: true, error: false, message: "" });
    try {
      await createPersona(persona);
      setState({ saving: false, error: false, message: "Empleado creado exitosamente." });
      setTimeout(() => navigate("/admin/empleados"), 3000);
    } catch (e) {
      setState({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Empleado
        </Titulo1>
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <CrearPersona persona={persona} setPersona={setPersona} />
          <DatosEmpleado persona={persona} setPersona={setPersona} />
          <ModalUsuario
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            persona={persona}
            setPersona={setPersona}
          />
          <Guardar guardar={crear} saving={state.saving} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  );
}

export default CrearEmpleado;