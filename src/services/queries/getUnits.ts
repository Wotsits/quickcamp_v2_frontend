import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { Unit } from "../../types";

type GetUnitsArgs = {
  /** mandatory, token */
  token: string;
};

export const getUnits = async ({ token }: GetUnitsArgs) => {
  const response = await axios.get<{ data: Unit[] }>(
    APIURL + API_ENDPOINTS.UNITS,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
