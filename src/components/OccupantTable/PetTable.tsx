import { IconButton, TextField } from "@mui/material";
import React from "react";
import "./style.css";
import { BookingProcessPet } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";

type PetTableProps = {
  pets: BookingProcessPet[];
  callbackOnPetEdit: (index: number, value: string, field: string) => void;
  callbackOnPetDelete: (index: number) => void;
};

const PetTable = ({
  pets,
  callbackOnPetEdit,
  callbackOnPetDelete,
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
