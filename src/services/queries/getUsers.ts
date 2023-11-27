import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import { User } from "../../types";

type GetUsersArgs = {
  /** mandatory, token */
  token: string;
};

export const getUsers = async ({ token }: GetUsersArgs) => {
  const response = await axios.get<User[]>(APIURL + API_ENDPOINTS.USERS, {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};
