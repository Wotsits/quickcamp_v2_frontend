import axios from "axios";
import { APIURL } from "../../settings";

type CheckInOneGuestArgs = {
  token: string;
  id: number;
  type: "GUEST" | "PET" | "VEHICLE";
};

export const checkInOneGuest = async ({
  token,
  id,
  type,
}: CheckInOneGuestArgs) => {
  return await axios.post(
    APIURL + "check-in-guest",
    {
      id, 
      type
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
