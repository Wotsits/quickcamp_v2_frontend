import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { GuestType, UnitType } from "../../types";

type GetGuestTypesArgs = {
  /** mandatory, token */
  token: string;
  /** optional, siteId */
  siteId?: number;
};

export const getGuestTypes = async ({ token, siteId }: GetGuestTypesArgs) => {
  const response = await axios.get<GuestType[]>(
    APIURL + API_ENDPOINTS.GUEST_TYPES,
    {
      headers: { Authorization: "Bearer " + token },
      params: { siteId },
    }
  );
  return response.data;
};
