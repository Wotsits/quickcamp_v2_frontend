import { Typography } from "@mui/material";
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../settings";

const Admin = () => {
  return (
    <div id="admin">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Admin
      </Typography>

      <div className="admin-content-container">
        <Link to={ROUTES.SITES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Sites
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit sites.
          </Typography>
        </Link>
        <Link to={ROUTES.UNIT_TYPES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Unit Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Unit Types.
          </Typography>
        </Link>
        <Link to={ROUTES.UNITS} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Units
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Units.
          </Typography>
        </Link>
        <Link to={ROUTES.GUEST_TYPES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Guest Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Guest Types.
          </Typography>
        </Link>
        <Link to={ROUTES.EQUIPMENT_TYPES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Equipment Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Equipment Types.
          </Typography>
        </Link>
        <Link to={ROUTES.EXTRA_TYPES} className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Extra Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Extra Types.
          </Typography>
        </Link>
      </div>
      <div className="admin-content-container">
        <Link to={ROUTES.USERS} className="admin-content-item">
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
