import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { UnitType } from "../../types";

type GetUnitTypesArgs = {
  /** mandatory, token */
  token: string;
  /** optional, siteId */
  siteId?: number;
  /** optional, include Units */
  includeUnits?: boolean;
  /** optional, include Site */
  includeSite?: boolean;
};

export const getUnitTypes = async ({
  token,
  siteId,
  includeUnits = false,
  includeSite = false,
}: GetUnitTypesArgs) => {
  const response = await axios.get<{ data: UnitType[] }>(
    APIURL + API_ENDPOINTS.UNIT_TYPES,
    {
      headers: { Authorization: "Bearer " + token },
      params: { siteId, includeUnits, includeSite },
    }
  );
  return response.data;
};
