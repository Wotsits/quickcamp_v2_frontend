import axios from 'axios';
import { APIURL } from '../../settings';
import { Booking, BookingSumm } from '../../types';

type GetBookingSummaries = {
    start: Date,
    end: Date,
    siteId: number,
    token: string
}

export const getBookingsByDateRange = async ({start, end, siteId, token}: GetBookingSummaries) => {
    const response = await axios.get<Booking[]>(APIURL + "bookings", {
        params: {
            start: start.toISOString(),
            end: end.toISOString(),
            siteId: siteId,
        },
        headers: { Authorization: "Bearer " + token },
    })
    return response.data;
}