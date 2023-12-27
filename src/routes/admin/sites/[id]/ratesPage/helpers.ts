import {
  GuestFeesCalendar,
  PetFeesCalendar,
  UnitTypeFeesCalendar,
  VehicleFeesCalendar,
} from "../../../../../types";
import { isSameDate } from "../../../../../utils/helpers";

export const generateBaseRate = (
  date: Date,
  unitTypeFeesCalendarEntries: UnitTypeFeesCalendar[]
) => {
  const unitRateDataForDate = unitTypeFeesCalendarEntries.find((entry) =>
    isSameDate(new Date(entry.date), new Date(date))
  );
  if (!unitRateDataForDate) return null;
  return {
    id: unitRateDataForDate.id,
    perNight: unitRateDataForDate.feePerNight,
    perStay: unitRateDataForDate.feePerStay,
  };
};

export const generateGuestRates = (
  date: Date,
  guestFeesCalendarEntries: GuestFeesCalendar[]
) => {
  const guestRateDataForDate = guestFeesCalendarEntries?.filter((entry) =>
    isSameDate(new Date(entry.date), date)
  );
  if (!guestRateDataForDate || guestRateDataForDate.length === 0) return null;
  const dataForReturn = guestRateDataForDate.map((guestRate) => {
    return [
      guestRate.guestType.name,
      {
        id: guestRate.id,
        perNight: guestRate.feePerNight,
        perStay: guestRate.feePerStay,
      },
    ];
  });
  if (dataForReturn.length === 0) return null;
  return dataForReturn;
};

export const generatePetRate = (
  date: Date,
  petFeesCalendarEntries: PetFeesCalendar[]
) => {
  const petRateDataForDate = petFeesCalendarEntries?.find((entry) =>
    isSameDate(new Date(entry.date), date)
  );
  if (!petRateDataForDate) return null;

  return {
    id: petRateDataForDate.id,
    perNight: petRateDataForDate.feePerNight,
    perStay: petRateDataForDate.feePerStay,
  };
};

export const generateVehicleRate = (
  date: Date,
  vehicleFeesCalendarEntries: VehicleFeesCalendar[]
) => {
  const vehicleRateDataForDate = vehicleFeesCalendarEntries?.find((entry) =>
    isSameDate(new Date(entry.date), date)
  );
  if (!vehicleRateDataForDate) return null;
  return {
    id: vehicleRateDataForDate.id,
    perNight: vehicleRateDataForDate.feePerNight,
    perStay: vehicleRateDataForDate.feePerStay,
  };
};
