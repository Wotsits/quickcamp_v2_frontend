import axios from "axios";
import { APIURL } from "../../settings";

type UpdateBookingLeadGuestExistingArgs = {
    token: string;
    bookingId: number;
    leadGuestId: number;
};

export const updateBookingLeadGuestExisting = ({token, bookingId, leadGuestId}: UpdateBookingLeadGuestExistingArgs) => {
  return axios.post(
    APIURL + "update-booking-lead-guest-existing",
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