import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Protected = ({ children }) => {
  const loggedIn = useSelector((store) => store?.user?.isLoggedIn);
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
