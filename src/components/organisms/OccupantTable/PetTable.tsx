import { IconButton, TextField } from "@mui/material";
import React from "react";
import "./style.css";
import { BookingProcessPet } from "../../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers";

type PetTableProps = {
  pets: BookingProcessPet[];
  callbackOnPetEdit: (index: number, value: string | Date | number | null, field: string) => void;
  callbackOnPetDelete: (index: number) => void;
  bookingStartDate: Date | null;
  bookingEndDate: Date | null;
};

const PetTable = ({
  pets,
  callbackOnPetEdit,
  callbackOnPetDelete,
  bookingStartDate,
  bookingEndDate,
}: PetTableProps) => {
  return (
    <div className="pet-table">
      {pets.length === 0 && <p>No pets added yet...</p>}
      {pets.map((pet: BookingProcessPet, index: number) => {
        return (
          <div className="row" key={index}>
            <div className="field-container">
              <TextField label="Name" variant="outlined" value={pet.name} fullWidth onChange={(e) => callbackOnPetEdit(index, e.target.value, "name") } />
            </div>
            <div className="start-end-container">
                <div className="field-container">
                  <DatePicker
                    label="Start Date*"
                    sx={{ width: "100%" }}
                    value={pet.start}
                    onChange={(date: Date | null) =>
                      callbackOnPetEdit(index, date, "start")
                    }
                    minDate={bookingStartDate as Date}
                    maxDate={bookingEndDate as Date}
                  />
                </div>
                <div className="field-container">
                  <DatePicker
                    label="End Date*"
                    sx={{ width: "100%" }}
                    value={pet.end}
                    onChange={(date: Date | null) =>
                      callbackOnPetEdit(index, date, "end")
                    }
                    minDate={bookingStartDate as Date}
                    maxDate={bookingEndDate as Date}
                  />
                </div>
              </div>
            <div className="delete-container">
              <IconButton onClick={() => callbackOnPetDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PetTable;
