import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const IsLoggedIn = ({ children }) => {
  const { authStatus } = useSelector((store) => store.auth);
  if (authStatus) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default IsLoggedIn;
