import axios from "axios";
import { APIURL, API_ENDPOINTS, ROUTES } from "../../settings";
import { Booking, BookingGroup } from "../../types";

type GetBookingGroupByIdArgs = {
  /** mandatory, token */
  token: string;
  /** mandatory, id */
  id: number;
};

export const getBookingGroupById = async ({ token, id }: GetBookingGroupByIdArgs) => {
  const response = await axios.get<{ data: BookingGroup }>(
    APIURL + API_ENDPOINTS.BOOKING_GROUPS,
    {
      headers: { Authorization: "Bearer " + token },
      params: { id },
    }
  );
  return response.data;
};
