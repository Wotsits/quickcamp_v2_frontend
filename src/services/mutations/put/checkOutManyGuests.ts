import axios from "axios";
import { APIURL } from "../../../settings";

type CheckOutManyGuestArgs = {
  token: string;
  guests: { id: number; type: "GUEST" | "PET" | "VEHICLE" }[];
  reverse?: boolean;
};

export const checkOutManyGuests = async ({
  token,
  guests,
  reverse,
}: CheckOutManyGuestArgs) => {
  return await axios.put(
    APIURL + "check-out-many-guests",
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
