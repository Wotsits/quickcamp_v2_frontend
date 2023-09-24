import React from "react";
import { Box, Typography } from "@mui/material";
import {
  BookingProcessGuest,
  BookingProcessPet,
  BookingProcessVehicle,
  GuestType,
} from "../../types";
import OccupantTableWrapper from "../OccupantTable";
import GuestTable from "../OccupantTable/GuestTable";
import PetTable from "../OccupantTable/PetTable";
import VehicleTable from "../OccupantTable/VehicleTable";

type OccupantDetailsProps = {
  guestTypes: GuestType[];
  guests: BookingProcessGuest[];
  pets: BookingProcessPet[];
  vehicles: BookingProcessVehicle[];
  setGuests: React.Dispatch<React.SetStateAction<BookingProcessGuest[]>>;
  setPets: React.Dispatch<React.SetStateAction<BookingProcessPet[]>>;
  setVehicles: React.Dispatch<React.SetStateAction<BookingProcessVehicle[]>>;
};

const OccupantDetails = ({
  guestTypes,
  guests,
  pets,
  vehicles,
  setGuests,
  setPets,
  setVehicles,
}: OccupantDetailsProps) => {
  const handleAddGuest = () => {
    const newBlankGuest: BookingProcessGuest = {
      id: -1,
      name: "Unnamed Guest",
      type: -1,
    };
    setGuests([...guests, newBlankGuest]);
  };

  const handleAddPet = () => {
    const newBlankPet: BookingProcessPet = {
      id: -1,
      name: "Unnamed Pet",
    };
    setPets([...pets, newBlankPet]);
  };

  const handleAddVehicle = () => {
    const newBlankVehicle: BookingProcessVehicle = {
      id: -1,
      vehicleReg: "Vehicle Reg Unknown",
    };
    setVehicles([...vehicles, newBlankVehicle]);
  };

  const handleGuestEdit = (index: number) => {
    console.log("Guest Edit: ", index);
  };

  const handleGuestDelete = (index: number) => {
    const guestsCopy = [...guests];
    guestsCopy.splice(index, 1);
    setGuests(guestsCopy);
  };

  const handlePetEdit = (index: number) => {
    console.log("Pet Edit: ", index);
  };

  const handlePetDelete = (index: number) => {
    const petsCopy = [...pets];
    petsCopy.splice(index, 1);
    setPets(petsCopy);
  };

  const handleVehicleEdit = (index: number) => {
    console.log("Vehicle Edit: ", index);
  };

  const handleVehicleDelete = (index: number) => {
    const vehiclesCopy = [...vehicles];
    vehiclesCopy.splice(index, 1);
    setVehicles(vehiclesCopy);
  };

  return (
    <Box id="occupant-details">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Occupant Details
      </Typography>
      <OccupantTableWrapper type="Guests" chipContent={guests.length.toString()} callbackOnAddClick={handleAddGuest}>
        <GuestTable
          guests={guests}
          guestTypes={guestTypes}
          callbackOnGuestEdit={handleGuestEdit}
          callbackOnGuestDelete={handleGuestDelete}
        />
      </OccupantTableWrapper>
      <OccupantTableWrapper type="Pets" chipContent={pets.length.toString()} callbackOnAddClick={handleAddPet}>
        <PetTable
          pets={pets}
          callbackOnPetEdit={handlePetEdit}
          callbackOnPetDelete={handlePetDelete}
        />
      </OccupantTableWrapper>
      <OccupantTableWrapper type="Vehicles" chipContent={vehicles.length.toString()} callbackOnAddClick={handleAddVehicle}>
        <VehicleTable
          vehicles={vehicles}
          callbackOnVehicleEdit={handleVehicleEdit}
          callbackOnVehicleDelete={handleVehicleDelete}
        />
      </OccupantTableWrapper>
    </Box>
  );
};

export default OccupantDetails;
