import axios from "axios";
import { APIURL } from "../../../settings";

type CheckInManyGuestArgs = {
  token: string;
  guests: { id: number; type: "GUEST" | "PET" | "VEHICLE" }[];
  reverse?: boolean;
  siteId: number;
};

export const checkInManyGuests = async ({
  token,
  guests,
  reverse,
  siteId
}: CheckInManyGuestArgs) => {
  return await axios.put(
    APIURL + "check-in-many-guests",
    {
      guests,
      reverse,
      siteId
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
