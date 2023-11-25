import axios from "axios";
import { APIURL, API_ENDPOINTS, ROUTES } from "../../settings";
import { Booking, BookingSumm } from "../../types";

type GetBookingSummaries = {
  /** mandatory, start date */
  start: Date;
  /** mandatory, end date */
  end: Date;
  /** mandatory, siteId */
  siteId: number;
  /** mandatory, token */
  token: string;
};

export const getBookingsByDateRange = async ({
  start,
  end,
  siteId,
  token,
}: GetBookingSummaries) => {
  const response = await axios.get<BookingSumm[]>(
    APIURL + API_ENDPOINTS.BOOKINGS_BY_SITE_AND_DATE_RANGE,
    {
      headers: { Authorization: "Bearer " + token },
      params: {
        start: start.toISOString(),
        end: end.toISOString(),
        siteId: siteId,
      },
    }
  );
  return response.data;
};
