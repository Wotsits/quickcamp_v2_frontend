import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";
import {
  BookingProcessGuest,
  BookingProcessPet,
  BookingProcessVehicle,
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
  /** mandatory, array of pets */
  bookingPets: BookingProcessPet[];
  /** mandatory, array of vehicles */
  bookingVehicles: BookingProcessVehicle[];
};

export const getFeeCalc = async ({
  token,
  unitTypeId,
  startDate,
  endDate,
  extras,
  bookingGuests,
  bookingPets,
  bookingVehicles,
}: GetFeeCalc) => {
  const response = await axios.get<FeeCalcResponse>(
    APIURL + API_ENDPOINTS.GET_FEE_CALC,
    {
      params: {
        token,
        unitTypeId,
        startDate,
        endDate,
        extras,
        bookingGuests,
        bookingPets,
        bookingVehicles,
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
