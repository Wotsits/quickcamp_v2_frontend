import { Badge, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./style.css";

type OccupantTableWrapperProps = {
  children: React.ReactNode;
  type: string;
  chipContent?: string;
  callbackOnAddClick: () => void;
};

const OccupantTableWrapper = ({
  children,
  type,
  chipContent,
  callbackOnAddClick,
}: OccupantTableWrapperProps) => {
  return (
    <div className="occupant-table-wrapper">
      <div className="occupant-table-header">
        <div className="occupant-table-header-type-container">
          <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
            {type}
          </Typography>
          {chipContent && <Chip label={chipContent} color="primary" sx={{ ml: 2 }} />}
        </div>
        <IconButton onClick={callbackOnAddClick}>
          <AddCircleIcon fontSize="large" color="primary" />
        </IconButton>
      </div>
      {children}
    </div>
  );
};

export default OccupantTableWrapper;
