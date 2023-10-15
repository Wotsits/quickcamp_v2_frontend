import axios from 'axios';
import { APIURL, API_ENDPOINTS, ROUTES } from '../../settings';
import { Booking, BookingSumm } from '../../types';

type GetArrivalsByDate = {
    date: Date,
    siteId: number,
    token: string
}

export const getArrivalsByDate = async ({date, siteId, token}: GetArrivalsByDate) => {
    const response = await axios.get<Booking[]>(APIURL + API_ENDPOINTS.ARRIVALS_BY_DATE, {
        params: {
            date: date.toISOString(),
            siteId: siteId,
        },
        headers: { Authorization: "Bearer " + token },
    })
    return response.data;
}