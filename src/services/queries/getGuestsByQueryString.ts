import axios from 'axios';
import { APIURL } from '../../settings';
import { LeadGuest } from '../../types';

type GetGuestsByQueryString = {
    /** mandatory, token */
    token: string,
    /** mandatory, query string */
    q: string,
}

export const getGuestsByQueryString = async ({q, token}: GetGuestsByQueryString) => {
    const response = await axios.get<LeadGuest[]>(APIURL + "lead-guests", {
        params: {
            q,
        },
        headers: { Authorization: "Bearer " + token },
    })
    return response.data;
}