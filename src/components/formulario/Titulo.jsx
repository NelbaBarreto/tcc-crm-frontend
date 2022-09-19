import React from "react";

export const Titulo1 = ({ children }) => {
  return (
    <span 
      className="title is-4 w-full bg-deep-purple-800 border-deep-purple-300 block p-2 
        text-white text-center border-b-4"
    >
      {children}
    </span>
  );
}

export const Titulo2 = ({ children }) => {
  return (
    <span 
      className="title is-5 w-full bg-deep-purple-100 border-deep-purple-800 block p-2 rounded-md text-deep-purple-800 text-center"
    >
      {children}
    </span>
  );
}
