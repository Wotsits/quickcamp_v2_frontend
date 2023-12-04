import axios from "axios";
import { APIURL } from "../../settings";

type UpdateBookingLeadGuestArgs = {
    token: string;
    bookingId: number;
    leadGuestId: number;
};

export const updateBookingLeadGuest = ({token, bookingId, leadGuestId}: UpdateBookingLeadGuestArgs) => {
  return axios.post(
    APIURL + "update-booking-lead-guest",
    {
      token,
      bookingId,
      leadGuestId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}