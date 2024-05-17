import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";

type GetUnconfirmedBookingsCount = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
};

export const getUnconfirmedBookingsCount = async ({ token, siteId }: GetUnconfirmedBookingsCount) => {
  const response = await axios.get<{ data: number}>(
    APIURL + API_ENDPOINTS.STATS + API_ENDPOINTS.UNCONFIRMED_BOOKINGS_COUNT,
    {
      params: {
        siteId,
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
