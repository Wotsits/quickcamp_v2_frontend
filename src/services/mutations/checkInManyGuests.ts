import axios from "axios";
import { APIURL } from "../../settings";

type CheckInManyGuestArgs = {
  token: string;
  guests: {id: number, type: "GUEST" | "PET" | "VEHICLE";}[];
};

export const checkInManyGuests = async ({
  token,
  guests,
}: CheckInManyGuestArgs) => {
  return await axios.post(
    APIURL + "check-in-many-guests",
    {
      guests,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};