import { Typography } from "@mui/material";
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../settings";
import PageHeader from "../../components/PageHeader";

const Admin = () => {
  return (
    <div id="admin">
      <PageHeader title="Admin" />
      <div className="admin-content-container">
        <Link to={ROUTES.ROOT + ROUTES.ADMIN + ROUTES.SITES + ROUTES.ALL} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Sites
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit sites.
          </Typography>
        </Link>
        <Link to={ROUTES.ROOT + ROUTES.ADMIN + ROUTES.UNIT_TYPES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Unit Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Unit Types.
          </Typography>
        </Link>
        <Link to={ROUTES.ROOT + ROUTES.ADMIN + ROUTES.UNITS} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Units
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Units.
          </Typography>
        </Link>
        <Link to={ROUTES.ROOT + ROUTES.ADMIN + ROUTES.GUEST_TYPES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Guest Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Guest Types.
          </Typography>
        </Link>
        <Link to={ROUTES.ROOT + ROUTES.ADMIN + ROUTES.EQUIPMENT_TYPES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Equipment Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Equipment Types.
          </Typography>
        </Link>
        <Link to={ROUTES.ROOT + ROUTES.ADMIN + ROUTES.EXTRA_TYPES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Extra Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Extra Types.
          </Typography>
        </Link>
      </div>
      <div className="admin-content-container">
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
