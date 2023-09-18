import axios from 'axios';
import { APIURL } from '../../settings';
import { Booking, BookingSumm } from '../../types';

type GetBookingSummaries = {
    start: Date,
    end: Date,
    token: string
}

export const getBookingsByDateRange = async ({start, end, token}: GetBookingSummaries) => {
    const response = await axios.get<Booking[]>(APIURL + "bookings", {
        params: {
            start: start.toISOString(),
            end: end.toISOString()
        },
        headers: { Authorization: "Bearer " + token },
    })
    return response.data;
}