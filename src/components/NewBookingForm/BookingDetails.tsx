import { Box, InputLabel, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

const BookingDetails = () => {
  return (
    <div id="booking-details">
      <Box marginBottom={3}>
        <div id="date-container">
          <DatePicker label="Start Date" sx={{width: "100%"}} />
          <DatePicker label="End Date" sx={{width: "100%"}} />
        </div>
        <TextField fullWidth label="Pitch" select>
          <MenuItem value={1}>Pitch 1</MenuItem>
          <MenuItem value={2}>Pitch 2</MenuItem>
          <MenuItem value={3}>Pitch 3</MenuItem>
        </TextField>
      </Box>
    </div>
  );
}

export default BookingDetails;