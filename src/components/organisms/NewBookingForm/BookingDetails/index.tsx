import {
  Alert,
  Box,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import "./style.css";
import {
  BookingProcessGuest,
  BookingProcessPet,
  BookingProcessVehicle,
  GuestTypeGroup,
  Unit,
} from "../../../../types";
import OccupantTableWrapper from "../../../organisms/OccupantTable";
import GuestTable from "../../../organisms/OccupantTable/GuestTable";

type BookingDetailsProps = {
  formUnitId: number | null;
  setFormUnitId: React.Dispatch<React.SetStateAction<number | null>>;
  formStartDate: Date | null;
  setFormStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  formEndDate: Date | null;
  setFormEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  availableUnitsAreLoading: boolean;
  availableUnits: Unit[] | undefined;
  dateError: string | null;
  guestTypeGroups: GuestTypeGroup[];
  guests: BookingProcessGuest[];
  pets: BookingProcessPet[];
  vehicles: BookingProcessVehicle[];
  setGuests: React.Dispatch<React.SetStateAction<BookingProcessGuest[]>>;
  setPets: React.Dispatch<React.SetStateAction<BookingProcessPet[]>>;
  setVehicles: React.Dispatch<React.SetStateAction<BookingProcessVehicle[]>>;
};

const BookingDetails = ({
  formUnitId,
  setFormUnitId,
  formStartDate,
  setFormStartDate,
  formEndDate,
  setFormEndDate,
  availableUnitsAreLoading,
  availableUnits,
  dateError,
  guestTypeGroups,
  guests,
  pets,
  vehicles,
  setGuests,
  setPets,
  setVehicles,
}: BookingDetailsProps) => {
  // --------------------
  // EVENT HANDLERS
  // --------------------

  const handleAddGuest = () => {
    const newBlankGuest: BookingProcessGuest = {
      id: -1,
      name: "Unnamed Guest",
      guestTypeId: -1,
      start: formStartDate as Date,
      end: formEndDate as Date,
    };
    setGuests([...guests, newBlankGuest]);
  };

  const handleAddPet = () => {
    const newBlankPet: BookingProcessPet = {
      id: -1,
      name: "Unnamed Pet",
      start: formStartDate as Date,
      end: formEndDate as Date,
    };
    setPets([...pets, newBlankPet]);
  };

  const handleAddVehicle = () => {
    const newBlankVehicle: BookingProcessVehicle = {
      id: -1,
      vehicleReg: "Vehicle Reg Unknown",
      start: formStartDate as Date,
      end: formEndDate as Date,
    };
    setVehicles([...vehicles, newBlankVehicle]);
  };

  const handleGuestDelete = (index: number) => {
    const guestsCopy = [...guests];
    guestsCopy.splice(index, 1);
    setGuests(guestsCopy);
  };

  const handlePetDelete = (index: number) => {
    const petsCopy = [...pets];
    petsCopy.splice(index, 1);
    setPets(petsCopy);
  };

  const handleVehicleDelete = (index: number) => {
    const vehiclesCopy = [...vehicles];
    vehiclesCopy.splice(index, 1);
    setVehicles(vehiclesCopy);
  };

  const handleGuestEdit = (
    index: number,
    value: string | Date | number | null,
    field: string
  ) => {
    const guestsCopy = [...guests];
    switch (field) {
      case "name":
        if (typeof value !== "string") return;
        guestsCopy[index].name = value;
        break;
      case "type":
        if (typeof value !== "string" && typeof value !== "number") return;
        guestsCopy[index].guestTypeId =
          typeof value === "number" ? value : parseInt(value);
        break;
      case "start":
        if (typeof value !== "object" && value !== null) return;
        guestsCopy[index].start = value as Date;
        break;
      case "end":
        if (typeof value !== "object" && value !== null) return;
        guestsCopy[index].end = value as Date;
        break;
    }
    setGuests(guestsCopy);
  };

  const handlePetEdit = (
    index: number,
    value: string | Date | number | null,
    field: string
  ) => {
    const petsCopy = [...pets];
    switch (field) {
      case "name":
        if (typeof value !== "string") return;
        petsCopy[index].name = value;
        break;
      case "start":
        if (typeof value !== "object" && value !== null) return;
        petsCopy[index].start = value as Date;
        break;
      case "end":
        if (typeof value !== "object" && value !== null) return;
        petsCopy[index].end = value as Date;
        break;
    }
    setPets(petsCopy);
  };

  const handleVehicleEdit = (
    index: number,
    value: string | Date | number | null,
    field: string
  ) => {
    const vehiclesCopy = [...vehicles];
    switch (field) {
      case "vehicleReg":
        if (typeof value !== "string") return;
        vehiclesCopy[index].vehicleReg = value;
        break;
      case "start":
        if (typeof value !== "object" && value !== null) return;
        vehiclesCopy[index].start = value as Date;
        break;
      case "end":
        if (typeof value !== "object" && value !== null) return;
        vehiclesCopy[index].end = value as Date;
        break;
    }
    setVehicles(vehiclesCopy);
  };

  // --------------------
  // RENDER
  // --------------------

  return (
    <div id="booking-details">
      <Box marginBottom={3}>
        <Typography sx={{ mb: 3 }} variant="h6" gutterBottom>
          Booking Details
        </Typography>
        <div id="date-container">
          <DatePicker
            label="Start Date*"
            sx={{ width: "100%" }}
            value={formStartDate}
            onChange={(date) => setFormStartDate(date)}
          />
          <DatePicker
            label="End Date*"
            sx={{ width: "100%" }}
            value={formEndDate}
            onChange={(date) => setFormEndDate(date)}
          />
        </div>
        {dateError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {dateError}
          </Alert>
        )}
        {availableUnitsAreLoading && <TextField required disabled fullWidth label="Pitch" value="Loading..." />}
        {!availableUnitsAreLoading && (
          <>
            {availableUnits && availableUnits.length === 0 && (
              <TextField required disabled fullWidth label="Pitch" value="No units available" />
            )}
            {availableUnits && availableUnits.length > 0 && (
              <TextField
                required
                fullWidth
                label="Pitch"
                select
                value={formUnitId}
                onChange={(e) => setFormUnitId(parseInt(e.target.value))}
              >
                {availableUnits &&
                  availableUnits.map((unit) => {
                    return (
                      <MenuItem key={unit.id} value={unit.id}>
                        <Typography variant="body1">{unit.name}</Typography>
                      </MenuItem>
                    );
                  })}
              </TextField>
            )}
          </>
        )}
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Box id="occupant-details">
        <OccupantTableWrapper
          type="Guests"
          chipContent={guests.length.toString()}
          callbackOnAddClick={handleAddGuest}
        >
          <GuestTable
            guests={guests}
            guestTypeGroups={guestTypeGroups}
            callbackOnGuestEdit={handleGuestEdit}
            callbackOnGuestDelete={handleGuestDelete}
            bookingStartDate={formStartDate as Date}
            bookingEndDate={formEndDate as Date}
          />
        </OccupantTableWrapper>
      </Box>
    </div>
  );
};

export default BookingDetails;
