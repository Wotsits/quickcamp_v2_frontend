import React from "react";
import { Navigate, useLocation,} from "react-router-dom";
import { ROUTES } from "../settings";
import AppFrame from "../components/AppFrame";

const Root = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  return (
    <AppFrame />
  );
};

export default Root;
