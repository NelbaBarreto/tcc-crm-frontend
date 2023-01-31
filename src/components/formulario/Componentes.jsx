import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Select from "react-select";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import es from "date-fns/locale/es";
registerLocale("es", es); 

export const Input = ({
  label, name, value = "", type = "text", placeholder = "", className = "input shadow-lg",
  disabled, onChange
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          name={name}
          className={className}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export const Datepicker = ({ label, selected, onChange }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <DatePicker
          className="input"
          onChange={onChange}
          selected={selected}
          locale="es"
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
}

export const Checkbox = ({ label, name, value, defaultValue, disabled, onChange }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          name={name}
          className="checkbox shadow-lg"
          type="checkbox"
          disabled={disabled}
          checked={value}
          defaultChecked={defaultValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export const Dropdown = ({
  label, name, value = "", placeholder = "Seleccionar", className = "shadow-lg", options,
    disabled, isMulti, onChange
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <Select
          name={name}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          isDisabled={disabled}
          isMulti={isMulti}
          options={options}
          isClearable={true}
        />
      </div>
    </div>
  );
}

export const TextArea = ({ label, name, value = "", type = "text", placeholder = "", className = "textarea shadow-lg", onChange, disabled }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          name={name}
          className={className}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export const TextView = ({ label, value = "" }) => {
  return (
    <div>
      <label className="label">{label}</label>
      <span>{value}</span>
    </div>
  );
}

export const DateFormat = ({ label, value = "", className = "label" }) => {
  return (
    <div>
      <label className={className}>{label}</label>
      <span>{format(parseISO(value), "dd/MM/yyyy hh:mm")}</span>
    </div>
  );
}

export const Image = ({ label, value = "", className = "label" }) => {
  const [url, setUrl] = useState("");
  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <label className={className}>{label}</label>
      {url ? <img className="h-52 mb-3" src={url} alt="Portada del curso" /> : null}
      <div className="file is-light">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            name="resume"
            onChange={handleChange}
          />
          <span className="file-cta">
            <span className="file-icon">
              <FontAwesomeIcon icon={solid("upload")} />
            </span>
            <span className="file-label font-bold">
              Subir Imagen
            </span>
          </span>
        </label>
      </div>
    </>
  );
}

export const classNameButton1 =
  "button font-semibold shadow-lg text-deep-purple-800 hover:text-white focus:text-white hover:bg-deep-purple-700 bg-deep-purple-100 disabled:bg-deep-purple-700";

export const classNameButton2 =
  "button font-semibold shadow-lg text-white hover:text-white focus:text-white hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2 disabled:bg-deep-purple-400";