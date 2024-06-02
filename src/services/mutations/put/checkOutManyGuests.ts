import axios from "axios";
import { APIURL } from "../../../settings";

type CheckOutManyGuestArgs = {
  token: string;
  guests: { id: number; type: "GUEST" | "PET" | "VEHICLE" }[];
  reverse?: boolean;
  siteId: number;
};

export const checkOutManyGuests = async ({
  token,
  guests,
  reverse,
  siteId
}: CheckOutManyGuestArgs) => {
  return await axios.put(
    APIURL + "check-out-many-guests",
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
