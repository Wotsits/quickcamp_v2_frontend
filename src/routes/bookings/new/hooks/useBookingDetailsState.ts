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
