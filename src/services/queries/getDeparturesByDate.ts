import axios from "axios";
import { APIURL, API_ENDPOINTS, ROUTES } from "../../settings";
import { Booking, BookingSumm } from "../../types";

type GetDeparturesByDate = {
  /** mandatory, date */
  date: Date;
  /** mandatory, siteId */
  siteId: number;
  /** mandatory, token */
  token: string;
};

export const getDeparturesByDate = async ({
  date,
  siteId,
  token,
}: GetDeparturesByDate) => {
  const response = await axios.get<{ data: Booking[] }>(
    APIURL + API_ENDPOINTS.DEPARTURES_BY_DATE,
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
