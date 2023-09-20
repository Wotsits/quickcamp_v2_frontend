import axios from "axios";
import { APIURL } from "../../settings";
import { Guest } from "../../types";

type GetGuestsArgs = {
  token: string;
};

export const getGuests = async ({ token }: GetGuestsArgs) => {
  const response = await axios.get<Guest[]>(APIURL + "guests", {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};
