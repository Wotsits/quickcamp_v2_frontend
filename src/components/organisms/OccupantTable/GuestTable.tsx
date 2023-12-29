import { Divider, IconButton, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import "./style.css";
import { BookingProcessGuest, GuestType } from "../../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers";

type GuestTableProps = {
  guests: BookingProcessGuest[];
  guestTypes: GuestType[];
  callbackOnGuestEdit: (
    index: number,
    value: string | Date | number | null,
    field: string
  ) => void;
  callbackOnGuestDelete: (index: number) => void;
  bookingStartDate: Date | null;
  bookingEndDate: Date | null;
};

const GuestTable = ({
  guests,
  guestTypes,
  callbackOnGuestEdit,
  callbackOnGuestDelete,
  bookingStartDate,
  bookingEndDate,
}: GuestTableProps) => {
  return (
    <div className="guest-table">
      {guests.length === 0 && <p>No occupants added yet...</p>}
      {guests.map((guest: BookingProcessGuest, index: number) => {
        return (
          <>
          <div className="row" key={index}>
            <div className="row-content-container">
              <div className="field-container">
                <TextField
                  label="Name"
                  variant="outlined"
                  value={guest.name}
                  onChange={(e) =>
                    callbackOnGuestEdit(index, e.target.value, "name")
                  }
                  fullWidth
                />
              </div>
              <div className="field-container">
                <TextField
                  label="Guest Type"
                  select
                  variant="outlined"
                  value={guest.guestTypeId}
                  onChange={(e) =>
                    callbackOnGuestEdit(index, e.target.value, "type")
                  }
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
              <div className="start-end-container">
                <div className="field-container">
                  <DatePicker
                    label="Start Date*"
                    sx={{ width: "100%" }}
                    value={guest.start}
                    onChange={(date: Date | null) =>
                      callbackOnGuestEdit(index, date, "start")
                    }
                    minDate={bookingStartDate as Date}
                    maxDate={bookingEndDate as Date}
                  />
                </div>
                <div className="field-container">
                  <DatePicker
                    label="End Date*"
                    sx={{ width: "100%" }}
                    value={guest.end}
                    onChange={(date: Date | null) =>
                      callbackOnGuestEdit(index, date, "end")
                    }
                    minDate={bookingStartDate as Date}
                    maxDate={bookingEndDate as Date}
                  />
                </div>
              </div>
            </div>

            <div className="delete-container">
              <IconButton onClick={() => callbackOnGuestDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <Divider sx={{mb: 2}} />
          </>
        );
      })}
    </div>
  );
};

export default GuestTable;
