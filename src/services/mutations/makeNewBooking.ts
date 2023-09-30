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
  leadGuestFirstName: string;
  leadGuestLastName: string;
  leadGuestEmail: string;
  leadGuestTel: string;
  leadGuestAddress1: string;
  leadGuestAddress2: string;
  leadGuestCity: string;
  leadGuestCounty: string;
  leadGuestPostcode: string;
  leadGuestCountry: string;
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
  leadGuestFirstName,
  leadGuestLastName,
  leadGuestEmail,
  leadGuestTel,
  leadGuestAddress1,
  leadGuestAddress2,
  leadGuestCity,
  leadGuestCounty,
  leadGuestPostcode,
  leadGuestCountry,
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
      leadGuestFirstName,
      leadGuestLastName,
      leadGuestEmail,
      leadGuestTel,
      leadGuestAddress1,
      leadGuestAddress2,
      leadGuestCity,
      leadGuestCounty,
      leadGuestPostcode,
      leadGuestCountry,
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
