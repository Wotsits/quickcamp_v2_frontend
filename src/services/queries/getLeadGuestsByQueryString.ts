import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { LeadGuest } from "../../types";

type GetLeadGuestsByQueryString = {
  /** mandatory, token */
  token: string;
  /** mandatory, query string */
  q: string;
};

export const getLeadGuestsByQueryString = async ({
  q,
  token,
}: GetLeadGuestsByQueryString) => {
  const response = await axios.get<{ data: LeadGuest[] }>(
    APIURL + API_ENDPOINTS.LEAD_GUESTS,
    {
      params: {
        q,
        // TODO add pagination to this as it is currently 
        // restricted by the backend to 10.
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
