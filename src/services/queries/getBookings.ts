import axios from 'axios';
import { APIURL } from '../../settings';
import { Booking } from '../../types';

export const getBookings = async () => {
    const response = await axios.get<Booking[]>(APIURL + "bookings")
    return response.data;
}