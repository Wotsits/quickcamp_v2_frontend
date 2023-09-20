import axios from "axios";
import { APIURL } from "../../settings";
import { Booking } from "../../types";

type GetBookingByIdArgs = {
  token: string;
  id: number;
};

export const getBookingById = async ({ token, id }: GetBookingByIdArgs)  => {
  const response = await axios.get<Booking>(APIURL + "booking", {
    headers: { Authorization: "Bearer " + token },
    params: {
      id,
    },
  });
  return response.data;
};
