import { IconButton, TextField } from "@mui/material";
import React from "react";
import "./style.css";
import { BookingProcessGuest } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";

type GuestTableProps = {
  guests: BookingProcessGuest[];
  callbackOnGuestEdit: (index: number) => void;
  callbackOnGuestDelete: (index: number) => void;
};

const GuestTable = ({
  guests,
  callbackOnGuestEdit,
  callbackOnGuestDelete,
}: GuestTableProps) => {
  return (
    <div className="guest-table">
      {guests.length === 0 && (

          <p>No occupants added yet...</p>

      )}
      {guests.map((guest: BookingProcessGuest, index: number) => {
        return (
          <div className="row" key={index}>
            <div className="field-container">
              <TextField
                label="Name"
                variant="outlined"
                value={guest.name}
                fullWidth
              />
            </div>
            <div className="field-container">
              <TextField
                label="Age"
                variant="outlined"
                value={guest.age}
                fullWidth
              />
            </div>
            <div className="delete-container">
              <IconButton onClick={() => callbackOnGuestDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GuestTable;
