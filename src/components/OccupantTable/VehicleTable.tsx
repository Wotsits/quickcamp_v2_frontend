import { IconButton, TextField } from "@mui/material";
import React from "react";
import "./style.css";
import { BookingProcessVehicle } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";

type VehicleTableProps = {
  vehicles: BookingProcessVehicle[];
  callbackOnVehicleEdit: (index: number) => void;
  callbackOnVehicleDelete: (index: number) => void;
};

const VehicleTable = ({
  vehicles,
  callbackOnVehicleEdit,
  callbackOnVehicleDelete,
}: VehicleTableProps) => {
  return (
    <div className="vehicle-table">
      {vehicles.length === 0 && <p>No vehicles added yet...</p>}
      {vehicles.map((vehicle: BookingProcessVehicle, index: number) => {
        return (
          <div className="row" key={index}>
            <div className="field-container">
              <TextField
                label="Registration"
                variant="outlined"
                value={vehicle.vehicleReg}
                fullWidth
              />
            </div>
            <div className="delete-container">
              <IconButton onClick={() => callbackOnVehicleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleTable;
