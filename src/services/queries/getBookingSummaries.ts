import axios from 'axios';
import { APIURL } from '../../settings';
import { BookingSumm } from '../../types';

export const getBookings = async (start: Date, end: Date) => {
    const response = await axios.get<BookingSumm[]>(APIURL + "booking-summaries", {
        params: {
            start: start.toISOString(),
            end: end.toISOString()
        }
    })
    return response.data;
}