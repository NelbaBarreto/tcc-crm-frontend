import React from "react";

export const Card = ({ titulo, children }) => {
  return (
    <div className="card h-full">
      <header className="card-header">
        <p className="card-header-title">
          {titulo}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}

export const Button = ({ label, name, Icon, onChange }) => {
  return (
    <button 
      className="flex flex-col p-3 justify-between m-1 bg-gray-50 rounded-md hover:border hover:border-gray-300 hover:bg-gray-200 text-center"
      name={name}
      // onChange={() => onChange()}
    >
      <span className="self-center">
        <Icon />
      </span>
      <span className="text-sm font-semibold mt-2 self-center">{label}</span>
    </button>
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
