import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";

type GetTotalOnSiteTonight = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
};

export const getTotalOnSiteTonight = async ({ token, siteId }: GetTotalOnSiteTonight) => {
  const response = await axios.get<{ data: { totalOnSiteTonight: [{guestTypeGroupName: string, count: number}] } }>(
    APIURL + API_ENDPOINTS.STATS + API_ENDPOINTS.TOTAL_ON_SITE_TONIGHT,
    {
      params: {
        siteId,
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
