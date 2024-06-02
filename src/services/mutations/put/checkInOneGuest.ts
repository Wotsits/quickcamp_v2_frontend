import axios from "axios";
import { APIURL } from "../../../settings";

type CheckInOneGuestArgs = {
  token: string;
  id: number;
  type: "GUEST" | "PET" | "VEHICLE";
  reverse?: boolean;
  siteId: number;
};

export const checkInOneGuest = async ({
  token,
  id,
  type,
  reverse,
  siteId
}: CheckInOneGuestArgs) => {
  return await axios.put(
    APIURL + "check-in-guest",
    {
      id, 
      type,
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
