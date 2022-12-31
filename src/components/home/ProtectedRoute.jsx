import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout/Index";

const ProtectedRoute = ({
  usuario,
  redirectPath = "/login",
  children,
}) => {
  if (!usuario) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;