import axios from "axios";
import { APIURL, API_ENDPOINTS, ROUTES } from "../../settings";
import { Booking, BookingSumm } from "../../types";

type GetArrivalsByDate = {
  /** mandatory, date */
  date: Date;
  /** mandatory, siteId */
  siteId: number;
  /** mandatory, token */
  token: string;
};

export const getArrivalsByDate = async ({
  date,
  siteId,
  token,
}: GetArrivalsByDate) => {
  const response = await axios.get<Booking[]>(
    APIURL + API_ENDPOINTS.ARRIVALS_BY_DATE,
    {
      headers: { Authorization: "Bearer " + token },
      params: {
        date: date.toISOString(),
        siteId,
      },
    }
  );
  return response.data;
};
