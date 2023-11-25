import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { Unit } from "../../types";

type GetAvailableUnits = {
  /** mandatory, token */
  token: string;
  /** mandatory, startDate */
  startDate: Date;
  /** mandatory, endDate */
  endDate: Date;
  /** mandatory, siteId */
  siteId: number;
  /** mandatory, equipmentTypeId */
  equipmentTypeId: number;
};

export const getAvailableUnits = async ({
  token,
  startDate,
  endDate,
  siteId,
  equipmentTypeId,
}: GetAvailableUnits) => {
  const response = await axios.get<Unit[]>(
    APIURL + API_ENDPOINTS.AVAILABLE_UNITS,
    {
      headers: { Authorization: "Bearer " + token },
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        siteId,
        equipmentTypeId,
      },
    }
  );
  return response.data;
};
