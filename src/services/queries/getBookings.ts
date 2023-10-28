import axios from "axios";
import { APIURL, API_ENDPOINTS, ROUTES } from "../../settings";
import { Booking } from "../../types";

type GetBookingsArgs = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
};

export const getBookings = async ({ token, siteId }: GetBookingsArgs) => {
  const response = await axios.get<Booking[]>(APIURL + API_ENDPOINTS.BOOKINGS_BY_SITE, {
    headers: { Authorization: "Bearer " + token },
    params: {
      siteId: siteId,
    },
  });
  return response.data;
};
