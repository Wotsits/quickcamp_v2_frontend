import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { Site } from "../../types";

type GetSitesArgs = {
  /** mandatory, token */
  token: string;
};

export const getSites = async ({ token }: GetSitesArgs) => {
  const response = await axios.get<{ data: Site[] }>(
    APIURL + API_ENDPOINTS.SITES,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
