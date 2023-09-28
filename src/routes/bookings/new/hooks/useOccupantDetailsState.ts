import React, { useState } from "react";
import {
  BookingProcessGuest,
  BookingProcessPet,
  BookingProcessVehicle,
} from "../../../../types";

export const useOccupantDetailsState = () => {
  const [formBookingGuests, setFormBookingGuests] = useState<
    BookingProcessGuest[]
  >([]);
  const [formBookingPets, setFormBookingPets] = useState<BookingProcessPet[]>(
    []
  );
  const [formBookingVehicles, setFormBookingVehicles] = useState<
    BookingProcessVehicle[]
  >([]);

  return {
    formBookingGuests,
    setFormBookingGuests,
    formBookingPets,
    setFormBookingPets,
    formBookingVehicles,
    setFormBookingVehicles,
  };
};
