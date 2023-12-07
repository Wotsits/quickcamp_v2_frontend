import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { EquipmentType } from "../../types";

type GetEquipmentTypesArgs = {
  /** mandatory, token */
  token: string;
  /** optional, siteId */
  siteId?: number;
};

export const getEquipmentTypes = async ({
  token,
  siteId,
}: GetEquipmentTypesArgs) => {
  const response = await axios.get<{ data: EquipmentType[] }>(
    APIURL + API_ENDPOINTS.EQUIPMENT_TYPES,
    {
      headers: { Authorization: "Bearer " + token },
      params: { siteId },
    }
  );
  return response.data;
};
