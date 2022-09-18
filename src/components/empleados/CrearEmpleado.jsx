import React, { useState } from "react";
import MostrarMensaje from "../MostrarMensaje";
import Volver from "../Volver";
import Guardar from "../Guardar";
import Select from "react-select";
import ModalUsuario from "../usuarios/ModalUsuario";
import { useNavigate } from "react-router-dom";
import { createPersona } from "../../api/personas";

const DatosPersona = ({ persona, setPersona }) => {
  const [tip_documento, setTipDocumento] = useState("");
  const options = [
    { value: "CI", label: "CI" },
    { value: "RUC", label: "RUC" },
    { value: "Pasaporte", label: "Pasaporte" }
  ]

  return (
    <section>
      <div className="divider">Datos Personales</div>
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control">
          <input
            name="nombre"
            className="input shadow-lg"
            value={persona.nombre || ""}
            onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value })}
            type="text"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            name="email"
            className="input shadow-lg"
            value={persona.email || ""}
            onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value, empleado: { ...persona.empleado, usuario: { ...persona.empleado.usuario, [e.target.name]: e.target.value } } })}
            type="email"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Número de Documento</label>
            <div className="control">
              <input
                name="nro_documento"
                className="input shadow-lg"
                value={persona.nro_documento || ""}
                onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value })}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Tipo de Documento</label>
            <div className="control">
              <Select
                name="tip_documento"
                className="shadow-lg"
                placeholder=""
                onChange={e => { setPersona({ ...persona, tip_documento: e.value }); setTipDocumento(e) }}
                value={tip_documento}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

const DatosEmpleado = ({ persona, setPersona }) => {
  return (
    <section>
      <div className="divider">Datos del Empleado</div>
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
    </section>
  );
};

const CrearEmpleado = () => {
  const [persona, setPersona] = useState({ empleado: { usuario: {} } });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await createPersona(persona);
      setSaving(false);
      setError("");
      navigate("/admin/empleados");
    } catch (e) {
      setSaving(false);
      setError(e.message);
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo Empleado</h1>
        {error ? <MostrarMensaje mensaje={error} error={true} /> : null}
        <form>
          <DatosPersona persona={persona} setPersona={setPersona} />
          <DatosEmpleado persona={persona} setPersona={setPersona} />
          <ModalUsuario
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            persona={persona}
            setPersona={setPersona}
          />
          <Guardar guardar={crear} saving={saving} />
        </form>
        <Volver navigate={navigate} />
      </section>
    </div>
  );
}

export default CrearEmpleado;