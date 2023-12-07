import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { LeadGuest } from "../../types";

type GetLeadGuestsArgs = {
  /** mandatory, token */
  token: string;
};

export const getLeadGuests = async ({ token }: GetLeadGuestsArgs) => {
  const response = await axios.get<{ data: LeadGuest[] }>(
    APIURL + API_ENDPOINTS.LEAD_GUESTS,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
