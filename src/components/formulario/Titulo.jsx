import React from "react";

export const Titulo1 = ({ children }) => {
  return (
    <span 
      className="title is-4 w-full block p-2 text-deep-purple-500"
    >
      {children}
    </span>
  );
}

export const Titulo2 = ({ children }) => {
  return (
    <span 
      className="title is-5 w-full bg-deep-purple-100 block p-2 rounded-md text-deep-purple-800 text-center"
    >
      {children}
    </span>
  );
}
