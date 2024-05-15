import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";

type GetTotalOnSiteNow = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
};

export const getTotalOnSiteNow = async ({ token, siteId }: GetTotalOnSiteNow) => {
  const response = await axios.get<{ data: { totalOnSiteNow: [{guestTypeGroupName: string, count: number}] } }>(
    APIURL + API_ENDPOINTS.STATS + API_ENDPOINTS.TOTAL_ON_SITE_NOW,
    {
      params: {
        siteId,
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
