import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { ExtraType } from "../../types";

type GetExtraTypesBySiteIdArgs = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
};

export const getExtraTypesBySiteId = async ({ token, siteId }: GetExtraTypesBySiteIdArgs) => {
  const response = await axios.get<ExtraType[]>(APIURL + API_ENDPOINTS.EXTRA_TYPES, {
    headers: { Authorization: "Bearer " + token },
    params: {
      siteId: siteId,
    },
  });
  return response.data;
};
