import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { UnitType } from "../../types";

type GetUnitTypesArgs = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
};

export const getUnitTypes = async ({ token, siteId }: GetUnitTypesArgs)  => {
  const response = await axios.get<UnitType[]>(APIURL + API_ENDPOINTS.UNIT_TYPES + siteId, {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};