import axios from "axios";
import { APIURL, API_ENDPOINTS, ROUTES } from "../../settings";
import { Booking, BookingSumm } from "../../types";

type GetBookings = {
  /** optional, id to filter by */
  id?: any;
  /** optional, start date to filter by */
  start?: any;
  /** optional, end date to filter by */
  end?: any;
  /** optional, unitId to filter by */
  unitId?: any;
  /** optional, totalFee to filter by */
  totalFee?: any;
  /** optional, leadGuestId to filter by */
  leadGuestId?: any;
  /** optional, status to filter by */
  status?: any;
  /** optional, bookingGroupId to filter by */
  bookingGroupId?: any;
  /** optional, guests to filter by */
  guests?: any;
  /** optional, skip number for pagination */
  skip?: number;
  /** optional, take number for pagination */
  take?: number;
  /** optional, include object for inclusion of nested objects */
  include?: any;
  /** optional, orderBy object to control orderBy params passed to API */
  orderBy?: any;
  /** optional, summariesOnly boolean */
  summariesOnly?: boolean;
  /** optional, count boolean */
  count?: boolean
  /** optional, AND object for ANDd query formation */
  AND?: any;
  /** optional, OR object for ORd query formation */
  OR?: any;
  /** mandatory, token */
  siteId: number;
  /** mandatory, token */
  token: string;
};

export const getBookings = async ({
  id,
  start,
  end,
  unitId,
  totalFee,
  leadGuestId,
  status,
  bookingGroupId,
  siteId,
  guests,
  skip,
  take,
  include,
  summariesOnly,
  count,
  AND,
  OR,
  orderBy,
  token,
}: GetBookings) => {
  const response = await axios.get<{ data: BookingSumm[] | Booking[], count: number | undefined 
   }>(
    APIURL + API_ENDPOINTS.BOOKING,
    {
      headers: { Authorization: "Bearer " + token },
      params: {
        id,
        start,
        end,
        unitId,
        totalFee,
        leadGuestId,
        status,
        bookingGroupId,
        siteId,
        guests,
        skip,
        take,
        include,
        summariesOnly,
        count,
        AND,
        OR,
        orderBy,
      },
    }
  );
  return response.data;
};
