import axios from "axios";
import { APIURL, API_ENDPOINTS, ROUTES } from "../../settings";
import { Booking } from "../../types";

type GetBookingsArgs = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
  /** mandatory, skip */
  skip: number;
  /** mandatory, first */
  take: number;
};

export const getBookings = async ({
  token,
  siteId,
  skip,
  take,
}: GetBookingsArgs) => {
  const response = await axios.get<{ data: Booking[]; count: number }>(
    APIURL + API_ENDPOINTS.BOOKINGS_BY_SITE,
    {
      headers: { Authorization: "Bearer " + token },
      params: { siteId, skip, take },
    }
  );
  return response.data;
};
