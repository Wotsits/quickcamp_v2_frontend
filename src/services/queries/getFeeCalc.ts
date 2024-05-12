import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import {
  BookingProcessGuest,
  FeeCalcResponse,
} from "../../types";

type GetFeeCalc = {
  /** mandatory, token */
  token: string;
  /** mandatory, unitTypeId */
  unitTypeId: number;
  /** mandatory, startDate of the booking */
  startDate: Date;
  /** mandatory, endDate of the booking */
  endDate: Date;
  /** mandatory, array of extra ids */
  extras: number[];
  /** mandatory, array of guests */
  bookingGuests: BookingProcessGuest[];
};

export const getFeeCalc = async ({
  token,
  unitTypeId,
  startDate,
  endDate,
  extras,
  bookingGuests,

}: GetFeeCalc) => {
  const response = await axios.get<{ data: FeeCalcResponse }>(
    APIURL + API_ENDPOINTS.GET_FEE_CALC,
    {
      params: {
        token,
        unitTypeId,
        startDate,
        endDate,
        extras,
        bookingGuests,
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
