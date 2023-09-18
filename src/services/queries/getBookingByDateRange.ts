import axios from 'axios';
import { APIURL } from '../../settings';
import { Booking, BookingSumm } from '../../types';

type GetBookingSummaries = {
    start: Date,
    end: Date
}

export const getBookingsByDateRange = async ({start, end}: GetBookingSummaries) => {
    const response = await axios.get<Booking[]>(APIURL + "bookings", {
        params: {
            start: start.toISOString(),
            end: end.toISOString()
        }
    })
    return response.data;
}