import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../../settings";
import { Booking, ChangedItems } from "../../../types";

type UpdateBookingChangedItems = {
  start?: Date;
  end?: Date;
  unitId?: number;
  totalFee?: number;
  leadGuestId?: number;
  status?: string;
  bookingGroupId?: number;
}

type UpdateBookingArgs = {
  token: string;
  id: number;
  changedItems: UpdateBookingChangedItems;
};

export const updateBooking = async ({
  token,
  id,
  changedItems
}: UpdateBookingArgs) => {
  return await axios.put(
    APIURL + API_ENDPOINTS.BOOKING + id,
    {
      changedItems
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
