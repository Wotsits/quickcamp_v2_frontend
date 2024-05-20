import { Typography } from "@mui/material";
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../settings";
import PageHeader from "../../components/molecules/PageHeader";

const Admin = () => {
  return (
    <div id="admin" className="h-full flex-column">
      <PageHeader title="Admin" />
      <div id="admin-content-container" className="flex-grow overflow-y-auto">
        <Link to={ROUTES.ROOT + ROUTES.ADMIN + ROUTES.SITES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Sites
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit sites, including their unit types, units, guest types, rates and availability.
          </Typography>
        </Link>
        <Link to={ROUTES.ROOT + ROUTES.ADMIN + ROUTES.USERS} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Users
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Users.
          </Typography>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
