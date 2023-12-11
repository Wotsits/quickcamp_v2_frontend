import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { LeadGuest } from "../../types";

type GetLeadGuestById = {
  /** mandatory, token */
  token: string;
  /** mandatory, lead guest ID */
  id: number;
};

export const getLeadGuestById = async ({
  id,
  token,
}: GetLeadGuestById) => {
  const response = await axios.get<{ data: LeadGuest }>(
    APIURL + API_ENDPOINTS.LEAD_GUESTS,
    {
      params: {
        id,
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
