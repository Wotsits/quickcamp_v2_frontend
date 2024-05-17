import axios from "axios";
import { APIURL, API_ENDPOINTS } from "../../settings";

type GetPaymentsBreakdownToday = {
  /** mandatory, token */
  token: string;
  /** mandatory, siteId */
  siteId: number;
};

export const getPaymentsBreakdownToday = async ({ token, siteId }: GetPaymentsBreakdownToday) => {
  const response = await axios.get<{ data: [{_sum: {paymentAmount: number}, paymentMethod: string}]}>(
    APIURL + API_ENDPOINTS.STATS + API_ENDPOINTS.PAYMENTS_BREAKDOWN_TODAY,
    {
      params: {
        siteId,
      },
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data;
};
