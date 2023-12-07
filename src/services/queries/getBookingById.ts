import axios from "axios";
import { APIURL, API_ENDPOINTS, ROUTES } from "../../settings";
import { Booking } from "../../types";

type GetBookingByIdArgs = {
  /** mandatory, token */
  token: string;
  /** mandatory, id */
  id: number;
};

export const getBookingById = async ({ token, id }: GetBookingByIdArgs) => {
  const response = await axios.get<{ data: Booking }>(
    APIURL + API_ENDPOINTS.BOOKING_BY_ID,
    {
      headers: { Authorization: "Bearer " + token },
      params: { id },
    }
  );
  return response.data;
};
