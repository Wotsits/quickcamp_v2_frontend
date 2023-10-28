import axios from "axios";
import { APIURL } from "../../settings";
import { LeadGuest } from "../../types";

type GetLeadGuestsArgs = {
  /** mandatory, token */
  token: string;
};

export const getLeadGuests = async ({ token }: GetLeadGuestsArgs) => {
  const response = await axios.get<LeadGuest[]>(APIURL + "lead-guests", {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};
