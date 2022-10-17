import React from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";

export const Input = ({ label, name, value = "", type = "text", placeholder = "", className = "input shadow-lg", onChange }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          name={name}
          className={className}
          placeholder={placeholder}
          type={type}
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
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
}

export const Checkbox = ({ label, value }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          name="activo"
          className="checkbox shadow-lg"
          type="checkbox"
          value={value}
        />
      </div>
    </div>
  );
}

export const Dropdown = ({ label, name, value = "", placeholder = "", className = "shadow-lg", options, onChange }) => {
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
          options={options}
          isClearable={true}
        />
      </div>
    </div>
  );
}

export const TextArea = ({ label, name, value = "", type = "text", placeholder = "", className = "textarea shadow-lg", onChange }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          name={name}
          className={className}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export const TextView = ({ label, value = "", className = "textarea shadow-lg" }) => {
  return (
    <div>
      <label className="label">{label}</label>
      <span>{value}</span>
    </div>
  );
}

export const Button1 = ({ onClick, children }) => {
  return (
    <button
      className="button font-semibold shadow-lg text-deep-purple-800 hover:text-white focus:text-white hover:bg-deep-purple-700 bg-deep-purple-100"
      onClick={() => onClick}
    >
      {children}
    </button>
  );
}