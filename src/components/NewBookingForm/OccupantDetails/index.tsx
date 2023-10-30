import React from "react";
import { Box, Typography } from "@mui/material";
import {
  BookingProcessGuest,
  BookingProcessPet,
  BookingProcessVehicle,
  GuestType,
} from "../../../types";
import OccupantTableWrapper from "../../OccupantTable";
import GuestTable from "../../OccupantTable/GuestTable";
import PetTable from "../../OccupantTable/PetTable";
import VehicleTable from "../../OccupantTable/VehicleTable";
import "./style.css";

type OccupantDetailsProps = {
  guestTypes: GuestType[];
  guests: BookingProcessGuest[];
  pets: BookingProcessPet[];
  vehicles: BookingProcessVehicle[];
  setGuests: React.Dispatch<React.SetStateAction<BookingProcessGuest[]>>;
  setPets: React.Dispatch<React.SetStateAction<BookingProcessPet[]>>;
  setVehicles: React.Dispatch<React.SetStateAction<BookingProcessVehicle[]>>;
  formStartDate: Date | null;
  formEndDate: Date | null;
};

const OccupantDetails = ({
  guestTypes,
  guests,
  pets,
  vehicles,
  setGuests,
  setPets,
  setVehicles,
  formStartDate,
  formEndDate,
}: OccupantDetailsProps) => {
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

  const handleGuestEdit = (index: number, value: string | Date | number | null, field: string) => {
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

  return (
    <Box id="occupant-details">
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
