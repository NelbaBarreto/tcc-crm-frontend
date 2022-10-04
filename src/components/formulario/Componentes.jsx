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