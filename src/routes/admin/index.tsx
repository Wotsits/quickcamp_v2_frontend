import { Typography } from "@mui/material";
import React from "react";
import "./style.css";

const Admin = () => {
  return (
    <div id="admin">
      <Typography sx={{mb:3}} variant="h5" gutterBottom>
        Admin
      </Typography>

      <div className="admin-content-container">
        <div className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Sites
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit sites.
          </Typography>
        </div>
        <div className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Unit Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Unit Types.
          </Typography>
        </div>
        <div className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Units
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Units.
          </Typography>
        </div>
        <div className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Guest Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Guest Types.
          </Typography>
        </div>
        <div className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Equipment Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Equipment Types.
          </Typography>
        </div>
        <div className="admin-content-item">
          <Typography variant="h6" gutterBottom>
            Extra Types
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add, remove, and edit Extra Types.
          </Typography>
        </div>
        </div>
        <div className="admin-content-container">
          <div className="admin-content-item">
            <Typography variant="h6" gutterBottom>
              Users
            </Typography>
            <Typography variant="body1" gutterBottom>
              Add, remove, and edit Users.
            </Typography>
          </div>
        </div>
    </div>
  );
};

export default Admin;
