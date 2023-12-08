import axios from "axios";
import { APIURL } from "../../settings";
import {
  BookingProcessGuest,
  BookingProcessPet,
  BookingProcessVehicle,
} from "../../types";

type MakeNewBookingArgs = {
  token: string;
  siteId: number;
  leadGuestId: number;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  address1: string;
  address2: string;
  townCity: string;
  county: string;
  postcode: string;
  country: string;
  unitId: number;
  startDate: Date;
  endDate: Date;
  equipmentTypeId: number;
  extras: number[];
  bookingGuests: BookingProcessGuest[];
  bookingPets: BookingProcessPet[];
  bookingVehicles: BookingProcessVehicle[];
  paymentAmount: number | null;
  paymentMethod: string | null;
  paymentDate: Date | null;
};

export const makeNewBooking = async ({
  token,
  siteId,
  leadGuestId,
  firstName,
  lastName,
  email,
  tel,
  address1,
  address2,
  townCity,
  county,
  postcode,
  country,
  unitId,
  startDate,
  endDate,
  equipmentTypeId,
  extras,
  bookingGuests,
  bookingPets,
  bookingVehicles,
  paymentAmount,
  paymentMethod,
  paymentDate,
}: MakeNewBookingArgs) => {
  return await axios.post(
    APIURL + "new-booking",
    {
      siteId,
      leadGuestId,
      firstName,
      lastName,
      email,
      tel,
      address1,
      address2,
      townCity,
      county,
      postcode,
      country,
      equipmentTypeId,
      unitId,
      startDate,
      endDate,
      extras,
      bookingGuests,
      bookingPets,
      bookingVehicles,
      paymentAmount,
      paymentMethod,
      paymentDate,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
