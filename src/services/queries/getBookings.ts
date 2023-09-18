import axios from "axios";
import { APIURL } from "../../settings";
import { Booking } from "../../types";

type GetBookingsArgs = {
  token: string;
};

export const getBookings = async ({ token }: GetBookingsArgs)  => {
  const response = await axios.get<Booking[]>(APIURL + "bookings", {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};
