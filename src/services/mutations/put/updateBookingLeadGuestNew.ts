import axios from "axios";
import { APIURL } from "../../../settings";

type UpdateBookingLeadGuestNewArgs = {
  token: string;
  bookingId: number;
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
};

export const updateBookingLeadGuestNew = ({
  token,
  bookingId,
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
}: UpdateBookingLeadGuestNewArgs) => {
  return axios.post(
    APIURL + "update-booking-lead-guest-new",
    {
      token,
      bookingId,
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
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
