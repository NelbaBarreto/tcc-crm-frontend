import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  usuario,
  redirectPath = "/login",
  children,
}) => {
  if (!usuario) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;