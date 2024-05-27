import axios from "axios";
import { APIURL } from "../../../settings";

type CheckInOneGuestArgs = {
  token: string;
  id: number;
  type: "GUEST" | "PET" | "VEHICLE";
  reverse?: boolean;
};

export const checkInOneGuest = async ({
  token,
  id,
  type,
  reverse,
}: CheckInOneGuestArgs) => {
  return await axios.put(
    APIURL + "check-in-guest",
    {
      id, 
      type,
      reverse,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
