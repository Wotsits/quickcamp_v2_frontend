import axios from "axios";
import { APIURL } from "../../../settings";
import { BulkRateUpdateObj } from "../../../types";

type UpdateRatesByDatesArgs = {
  token: string;
  startDate: Date;
  endDate: Date;
  changedItems: BulkRateUpdateObj[];
};

export const updateRatesByDates = async ({
  token,
  startDate,
  endDate,
  changedItems
}: UpdateRatesByDatesArgs) => {
  return await axios.put(
    APIURL + "update-rates-by-dates",
    {
      startDate,
      endDate,
      changedItems
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
