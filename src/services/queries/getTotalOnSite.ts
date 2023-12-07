import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";

type GetTotalOnSite = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
};

export const getTotalOnSite = async ({ token, siteId }: GetTotalOnSite) => {
  const response = await axios.get<{ data: { totalOnSite: number } }>(
    APIURL + API_ENDPOINTS.STATS + API_ENDPOINTS.TOTAL_ON_SITE,
    {
      params: {
        siteId,
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
