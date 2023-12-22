import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { Site } from "../../types";

type GetSiteArgs = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  id: number;
};

export const getSite = async ({ token, id }: GetSiteArgs) => {
  const response = await axios.get<{ data: Site }>(
    APIURL + API_ENDPOINTS.SITES,
    {
      params: { id },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
