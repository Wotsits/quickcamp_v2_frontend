import { Box, InputLabel, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import "./style.css";
import { Unit } from "../../../types";

type BookingDetailsProps = {
  formUnitId: number | null;
  setFormUnitId: React.Dispatch<React.SetStateAction<number | null>>;
  formStartDate: Date | null;
  setFormStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  formEndDate: Date | null;
  setFormEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  availableUnits: Unit[];
};

const BookingDetails = ({formUnitId, setFormUnitId, formStartDate, setFormStartDate, formEndDate, setFormEndDate, availableUnits}: BookingDetailsProps) => {
  return (
    <div id="booking-details">
      <Box marginBottom={3}>
        <div id="date-container">
          <DatePicker label="Start Date*" sx={{width: "100%"}} value={formStartDate} onChange={(date) => setFormStartDate(date)} />
          <DatePicker label="End Date*" sx={{width: "100%"}} value={formEndDate} onChange={(date) => setFormEndDate(date)} />
        </div>
        <TextField required fullWidth label="Pitch" select value={formUnitId} onChange={(e) => setFormUnitId(parseInt(e.target.value))}>
          {availableUnits && availableUnits.map((unit) => {
            return (
              <MenuItem key={unit.id} value={unit.id}>
                <Typography variant="body1">{unit.name}</Typography>
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
    </div>
  );
}

export default BookingDetails;