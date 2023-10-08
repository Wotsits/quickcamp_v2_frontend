import axios from "axios";
import { APIURL, API_ENDPOINTS, ROUTES } from "../../settings";
import { Booking } from "../../types";

type GetBookingByIdArgs = {
  token: string;
  id: number;
};

export const getBookingById = async ({ token, id }: GetBookingByIdArgs)  => {
  const response = await axios.get<Booking>(APIURL + API_ENDPOINTS.BOOKING_BY_ID, {
    headers: { Authorization: "Bearer " + token },
    params: {
      id,
    },
  });
  return response.data;
};
