import { IconButton, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import "./style.css";
import { BookingProcessGuest, GuestType } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";

type GuestTableProps = {
  guests: BookingProcessGuest[];
  guestTypes: GuestType[];
  callbackOnGuestEdit: (index: number, value: string, field: string) => void;
  callbackOnGuestDelete: (index: number) => void;
};

const GuestTable = ({
  guests,
  guestTypes,
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
                onChange={(e) => callbackOnGuestEdit(index, e.target.value, "name")}
                fullWidth
              />
            </div>
            <div className="field-container">
              <TextField
                label="Guest Type"
                select
                variant="outlined"
                value={guest.guestTypeId}
                onChange={(e) => callbackOnGuestEdit(index, e.target.value, "type")}
                fullWidth
              >
                {guestTypes.map((guestType) => {
                  return (
                    <MenuItem key={guestType.id} value={guestType.id}>
                      {guestType.name}
                    </MenuItem>
                  );
                })}
              </TextField>
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
