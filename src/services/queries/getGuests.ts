import axios from "axios";
import { APIURL } from "../../settings";
import { LeadGuest } from "../../types";

type GetGuestsArgs = {
  token: string;
};

export const getGuests = async ({ token }: GetGuestsArgs) => {
  const response = await axios.get<LeadGuest[]>(APIURL + "lead-guests", {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};
