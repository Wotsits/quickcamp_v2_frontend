import { IconButton, TextField } from "@mui/material";
import React from "react";
import "./style.css";
import { BookingProcessVehicle } from "../../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers";

type VehicleTableProps = {
  vehicles: BookingProcessVehicle[];
  callbackOnVehicleEdit: (index: number, value: string | number | Date | null, field: string) => void;
  callbackOnVehicleDelete: (index: number) => void;
  bookingStartDate: Date | null;
  bookingEndDate: Date | null;
};

const VehicleTable = ({
  vehicles,
  callbackOnVehicleEdit,
  callbackOnVehicleDelete,
  bookingStartDate,
  bookingEndDate,
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
                onChange={(e) =>
                  callbackOnVehicleEdit(index, e.target.value, "vehicleReg")
                }
              />
            </div>
            <div className="start-end-container">
                <div className="field-container">
                  <DatePicker
                    label="Start Date*"
                    sx={{ width: "100%" }}
                    value={vehicle.start}
                    onChange={(date: Date | null) =>
                      callbackOnVehicleEdit(index, date, "start")
                    }
                    minDate={bookingStartDate as Date}
                    maxDate={bookingEndDate as Date}
                  />
                </div>
                <div className="field-container">
                  <DatePicker
                    label="End Date*"
                    sx={{ width: "100%" }}
                    value={vehicle.end}
                    onChange={(date: Date | null) =>
                      callbackOnVehicleEdit(index, date, "end")
                    }
                    minDate={bookingStartDate as Date}
                    maxDate={bookingEndDate as Date}
                  />
                </div>
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
