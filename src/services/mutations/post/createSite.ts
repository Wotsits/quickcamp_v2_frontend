import axios from "axios";
import { APIURL } from "../../../settings";

type CreateSiteArgs = {
  token: string;
  name: string;
  description: string;
  address1: string;
  address2: string;
  townCity: string;
  county: string;
  postcode: string;
  country: string;
  email: string;
  tel: string;
  website: string;
  latitude: number;
  longitude: number;
};

export const createSite = async ({
  token,
  name,
  description,
  email,
  tel,
  address1,
  address2,
  townCity,
  county,
  postcode,
  country,
  website,
  latitude,
  longitude,
}: CreateSiteArgs) => {
  return await axios.post(
    APIURL + "new-site",
    {
      name,
      description,
      email,
      tel,
      address1,
      address2,
      townCity,
      county,
      postcode,
      country,
      website,
      latitude,
      longitude,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
