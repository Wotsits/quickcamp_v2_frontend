import axios from "axios";
import { BookingProcessGuest } from "../../../types";
import { APIURL, API_ENDPOINTS } from "../../../settings";

type createBookingArgs = {
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
  paymentAmount: number | null;
  paymentMethod: string | null;
  paymentDate: Date | null;
};

export const createBooking = async ({
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
  paymentAmount,
  paymentMethod,
  paymentDate,
}: createBookingArgs) => {
  return await axios.post(
    APIURL + API_ENDPOINTS.BOOKING + "new/",
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
