import React, { useEffect, useState } from "react";
import addDays from "date-fns/addDays";
import {
  BookingProcessGuest,
  BookingProcessPet,
  BookingProcessVehicle,
} from "../../../../types";

type BookingDetailsStateHookArgs = {
  requestedUnitTypeId: number | null;
  requestedStartDate: Date | null;
};

export const useBookingDetailsState = ({
  requestedStartDate,
  requestedUnitTypeId,
}: BookingDetailsStateHookArgs) => {
  const [formUnitId, setFormUnitId] = useState<number | null>(null);
  const [formUnitTypeId, setFormUnitTypeId] = useState<number | null>(
    requestedUnitTypeId
  );
  const [formStartDate, setFormStartDate] = useState<Date | null>(
    new Date(requestedStartDate || new Date())
  );
  const [formEndDate, setFormEndDate] = useState<Date | null>(
    addDays(new Date(requestedStartDate || new Date()), 1)
  );
  const [dateError, setDateError] = useState<string | null>(null);
  const [formBookingGuests, setFormBookingGuests] = useState<
    BookingProcessGuest[]
  >([]);
  const [formBookingPets, setFormBookingPets] = useState<BookingProcessPet[]>(
    []
  );
  const [formBookingVehicles, setFormBookingVehicles] = useState<
    BookingProcessVehicle[]
  >([]);

  useEffect(() => {
    if (formStartDate && formEndDate && formStartDate >= formEndDate) {
      setDateError("End date must be after start date");
    } else {
      setDateError(null);
    }
  }, [formStartDate, formEndDate]);

  useEffect(() => {
    // dogs and vehicles cannot come without guests so any dogs or vehicles where the start is before the earliest guest start date are set with a start to match that date. Also any dogs or vehicles where the end is after the latest guest end date are set with an end to match that date.
    const earliestGuestStartDate = formBookingGuests.reduce(
      (earliest, guest) => (guest.start < earliest ? guest.start : earliest),
      formStartDate || new Date()
    );

    const latestGuestEndDate = formBookingGuests.reduce(
      (latest, guest) => (guest.end > latest ? guest.end : latest),
      formEndDate || addDays(new Date(), 1)
    );

    const updatedPets = formBookingPets.map((pet) => {
      if (pet.start < earliestGuestStartDate) {
        return { ...pet, start: earliestGuestStartDate };
      } else if (pet.end > latestGuestEndDate) {
        return { ...pet, end: latestGuestEndDate };
      } else {
        return pet;
      }
    });

    const updatedVehicles = formBookingVehicles.map((vehicle) => {
      if (vehicle.start < earliestGuestStartDate) {
        return { ...vehicle, start: earliestGuestStartDate };
      } else if (vehicle.end > latestGuestEndDate) {
        return { ...vehicle, end: latestGuestEndDate };
      } else {
        return vehicle;
      }
    });

    setFormBookingPets(updatedPets);
    setFormBookingVehicles(updatedVehicles);

    // the booking start and end date are also set to match the earliest guest start date and latest guest end date
    if (formStartDate && formStartDate < earliestGuestStartDate) {
      setFormStartDate(earliestGuestStartDate);
    }
    if (formEndDate && formEndDate > latestGuestEndDate) {
      setFormEndDate(latestGuestEndDate);
    }
  }, [formBookingGuests, formBookingPets, formBookingVehicles]);

  useEffect(() => {
    /* 
    if the startdate or enddates are changed then the guests, 
    pets and vehicles are updated to match the new dates
    */

    const updatedGuests = formBookingGuests.map((guest) => {
      return {
        ...guest,
        start: formStartDate || new Date(),
        end: formEndDate || addDays(new Date(), 1),
      };
    });

    const updatedPets = formBookingPets.map((pet) => {
      return {
        ...pet,
        start: formStartDate || new Date(),
        end: formEndDate || addDays(new Date(), 1),
      };
    });

    const updatedVehicles = formBookingVehicles.map((vehicle) => {
      return {
        ...vehicle,
        start: formStartDate || new Date(),
        end: formEndDate || addDays(new Date(), 1),
      };
    });

    setFormBookingGuests(updatedGuests);
    setFormBookingPets(updatedPets);
    setFormBookingVehicles(updatedVehicles);
  }, [formStartDate, formEndDate]);

  return {
    formUnitId,
    setFormUnitId,
    formUnitTypeId,
    setFormUnitTypeId,
    formStartDate,
    setFormStartDate,
    formEndDate,
    setFormEndDate,
    dateError,
    formBookingGuests,
    setFormBookingGuests,
    formBookingPets,
    setFormBookingPets,
    formBookingVehicles,
    setFormBookingVehicles,
  };
};
