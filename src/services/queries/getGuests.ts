import axios from 'axios';
import { APIURL } from '../../settings';
import { Guest } from '../../types';

export const getGuests = async () => {
    const response = await axios.get<Guest[]>(APIURL + "guests")
    return response.data;
}