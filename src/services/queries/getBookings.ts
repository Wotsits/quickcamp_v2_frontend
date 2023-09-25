import axios from "axios";
import { APIURL } from "../../settings";
import { Booking } from "../../types";

type GetBookingsArgs = {
  token: string;
  siteId: number;
};

export const getBookings = async ({ token, siteId }: GetBookingsArgs) => {
  const response = await axios.get<Booking[]>(APIURL + "bookings", {
    headers: { Authorization: "Bearer " + token },
    params: {
      siteId: siteId,
    },
  });
  return response.data;
};
