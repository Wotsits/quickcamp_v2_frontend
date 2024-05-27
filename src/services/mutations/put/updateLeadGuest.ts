import axios from "axios";
import { APIURL } from "../../../settings";

type UpdateLeadGuestArgs = {
  token: string;
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  tel?: string;
  address1?: string;
  address2?: string;
  townCity?: string;
  county?: string;
  postcode?: string;
  country?: string;
};

export const updateLeadGuest = async ({
  token,
  id,
  firstName,
  lastName,
  email,
  tel,
  address1,
  address2,
  townCity,
  county,
  postcode,
  country,
}: UpdateLeadGuestArgs) => {
  return await axios.put(
    APIURL + "update-lead-guest",
    {
      id,
      firstName,
      lastName,
      email,
      tel,
      address1,
      address2,
      townCity,
      county,
      postcode,
      country,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
