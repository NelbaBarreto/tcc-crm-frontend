import React from "react";
import DatePicker from "react-datepicker";

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

export const Datepicker = ({ label, selected }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <DatePicker
          className="input"
          selected={selected}
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