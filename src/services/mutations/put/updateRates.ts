import axios from "axios";
import { APIURL } from "../../../settings";
import { ChangedItems } from "../../../types";

type UpdateRatesArgs = {
  token: string;
  changedItems: ChangedItems;
};

export const updateRates = async ({
  token,
  changedItems
}: UpdateRatesArgs) => {
  return await axios.put(
    APIURL + "update-rates",
    {
      changedItems
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
