import axios from "axios";
import { APIURL } from "../../settings";
import { UnitType } from "../../types";

type GetUnitTypesArgs = {
  token: string;
  siteId: number;
};

export const getUnitTypes = async ({ token, siteId }: GetUnitTypesArgs)  => {
  const response = await axios.get<UnitType[]>(APIURL + "unit-types/" + siteId, {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};