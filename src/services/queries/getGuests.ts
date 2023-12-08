import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { LeadGuest } from "../../types";

type GetLeadGuestsArgs = {
  /** mandatory, token */
  token: string;
  /** mandatory, skip */
  skip: number;
  /** mandatory, take */
  take: number;
};

export const getLeadGuests = async ({ token, skip, take }: GetLeadGuestsArgs) => {
  const response = await axios.get<{ data: LeadGuest[], count: number }>(
    APIURL + API_ENDPOINTS.LEAD_GUESTS,
    {
      headers: { Authorization: "Bearer " + token },
      params: { skip, take },
    }
  );
  return response.data;
};
