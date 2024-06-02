import axios from "axios";
import { APIURL } from "../../../settings";

type CheckOutOneGuestArgs = {
  token: string;
  id: number;
  type: "GUEST" | "PET" | "VEHICLE";
  reverse?: boolean;
  siteId: number;
};

export const checkOutOneGuest = async ({
  token,
  id,
  type,
  reverse,
  siteId
}: CheckOutOneGuestArgs) => {
  return await axios.put(
    APIURL + "check-out-guest",
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
