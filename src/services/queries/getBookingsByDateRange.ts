import axios from 'axios';
import { APIURL, API_ENDPOINTS, ROUTES } from '../../settings';
import { Booking, BookingSumm } from '../../types';

type GetBookingSummaries = {
    start: Date,
    end: Date,
    siteId: number,
    token: string
}

export const getBookingsByDateRange = async ({start, end, siteId, token}: GetBookingSummaries) => {
    const response = await axios.get<Booking[]>(APIURL + API_ENDPOINTS.BOOKINGS_BY_SITE_AND_DATE_RANGE, {
        params: {
            start: start.toISOString(),
            end: end.toISOString(),
            siteId: siteId,
        },
        headers: { Authorization: "Bearer " + token },
    })
    return response.data;
}