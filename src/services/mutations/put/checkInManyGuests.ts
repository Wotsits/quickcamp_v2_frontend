import axios from "axios";
import { APIURL } from "../../../settings";

type CheckInManyGuestArgs = {
  token: string;
  guests: { id: number; type: "GUEST" | "PET" | "VEHICLE" }[];
  reverse?: boolean;
};

export const checkInManyGuests = async ({
  token,
  guests,
  reverse,
}: CheckInManyGuestArgs) => {
  return await axios.put(
    APIURL + "check-in-many-guests",
    {
      guests,
      reverse,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
