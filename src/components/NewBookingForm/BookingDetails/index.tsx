import {
  Alert,
  Box,
  Divider,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import "./style.css";
import { BookingProcessGuest, BookingProcessPet, BookingProcessVehicle, GuestType, Unit } from "../../../types";
import OccupantTableWrapper from "../../OccupantTable";
import GuestTable from "../../OccupantTable/GuestTable";
import PetTable from "../../OccupantTable/PetTable";
import VehicleTable from "../../OccupantTable/VehicleTable";

type BookingDetailsProps = {
  formUnitId: number | null;
  setFormUnitId: React.Dispatch<React.SetStateAction<number | null>>;
  formStartDate: Date | null;
  setFormStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  formEndDate: Date | null;
  setFormEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  availableUnits: Unit[];
  dateError: string | null;
  guestTypes: GuestType[];
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
  availableUnits,
  dateError,
  guestTypes,
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
        if (typeof value !== "string") return;
        guestsCopy[index].guestTypeId = parseInt(value);
        break;
      case "start":
        if (typeof value !== "object" || typeof value !== null) return;
        guestsCopy[index].start = value as Date;
        break;
      case "end":
        if (typeof value !== "object" || typeof value !== null) return;
        guestsCopy[index].end = value as Date;
        break;
    }
    setGuests(guestsCopy);
  };

  const handlePetEdit = (index: number, value: string, field: string) => {
    const petsCopy = [...pets];
    switch (field) {
      case "name":
        petsCopy[index].name = value;
        break;
      case "start":
        if (typeof value !== "object" || typeof value !== null) return;
        petsCopy[index].start = value as Date;
        break;
      case "end":
        if (typeof value !== "object" || typeof value !== null) return;
        petsCopy[index].end = value as Date;
        break;
    }
    setPets(petsCopy);
  };

  const handleVehicleEdit = (index: number, value: string, field: string) => {
    const vehiclesCopy = [...vehicles];
    switch (field) {
      case "vehicleReg":
        vehiclesCopy[index].vehicleReg = value;
        break;
      case "start":
        if (typeof value !== "object" || typeof value !== null) return;
        vehiclesCopy[index].start = value as Date;
        break;
      case "end":
        if (typeof value !== "object" || typeof value !== null) return;
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
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box id="occupant-details">
        <OccupantTableWrapper
          type="Guests"
          chipContent={guests.length.toString()}
          callbackOnAddClick={handleAddGuest}
        >
          <GuestTable
            guests={guests}
            guestTypes={guestTypes}
            callbackOnGuestEdit={handleGuestEdit}
            callbackOnGuestDelete={handleGuestDelete}
          />
        </OccupantTableWrapper>
        <OccupantTableWrapper
          type="Pets"
          chipContent={pets.length.toString()}
          callbackOnAddClick={handleAddPet}
        >
          <PetTable
            pets={pets}
            callbackOnPetEdit={handlePetEdit}
            callbackOnPetDelete={handlePetDelete}
          />
        </OccupantTableWrapper>
        <OccupantTableWrapper
          type="Vehicles"
          chipContent={vehicles.length.toString()}
          callbackOnAddClick={handleAddVehicle}
        >
          <VehicleTable
            vehicles={vehicles}
            callbackOnVehicleEdit={handleVehicleEdit}
            callbackOnVehicleDelete={handleVehicleDelete}
          />
        </OccupantTableWrapper>
      </Box>
    </div>
  );
};

export default BookingDetails;
