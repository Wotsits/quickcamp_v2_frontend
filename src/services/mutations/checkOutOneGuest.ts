import axios from "axios";
import { APIURL } from "../../settings";

type CheckOutOneGuestArgs = {
  token: string;
  id: number;
  type: "GUEST" | "PET" | "VEHICLE";
  reverse?: boolean;
};

export const checkOutOneGuest = async ({
  token,
  id,
  type,
  reverse,
}: CheckOutOneGuestArgs) => {
  return await axios.post(
    APIURL + "check-out-guest",
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
