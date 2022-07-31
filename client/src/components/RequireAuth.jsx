import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { authStatus } = useSelector((store) => store.auth);
  if (!authStatus) {
    return <Navigate to="/signup" />;
  }
  return <>{children}</>;
};

export default RequireAuth;
