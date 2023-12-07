import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { ExtraType } from "../../types";

type GetExtraTypesArgs = {
  /** mandatory, token */
  token: string;
  /** optional, siteId */
  siteId?: number;
  /** optional, includeUnitTypes */
  includeUnitTypes?: boolean;
  /** optional, includeSite */
  includeSite?: boolean;
};

export const getExtraTypes = async ({
  token,
  siteId,
  includeUnitTypes = false,
  includeSite = false,
}: GetExtraTypesArgs) => {
  const response = await axios.get<{ data: ExtraType[] }>(
    APIURL + API_ENDPOINTS.EXTRA_TYPES,
    {
      headers: { Authorization: "Bearer " + token },
      params: { siteId, includeUnitTypes, includeSite },
    }
  );
  return response.data;
};
