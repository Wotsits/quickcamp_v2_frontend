import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";

type GetTotalPaymentsToday = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
};

export const getTotalPaymentsToday = async ({ token, siteId }: GetTotalPaymentsToday) => {
  const response = await axios.get<{ data: {_sum: {paymentAmount: number}}}>(
    APIURL + API_ENDPOINTS.STATS + API_ENDPOINTS.TOTAL_PAYMENTS_TODAY,
    {
      params: {
        siteId,
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
