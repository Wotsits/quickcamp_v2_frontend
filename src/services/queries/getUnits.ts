import axios from "axios";
import { APIURL } from "../../settings";
import { Unit } from "../../types";

type GetUnitsArgs = {
  /** mandatory, token */
  token: string;
};

export const getUnits = async ({ token }: GetUnitsArgs)  => {
  const response = await axios.get<Unit[]>(APIURL + "units", {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};