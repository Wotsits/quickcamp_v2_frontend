import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import { Booking } from '../../types';
import { getBookingById } from '../../services/queries/getBookingById';

const IndividualBooking = () => {
    const {user} = useContext(AuthContext);
    const params = useParams();
    
    if (!params || !params.id) {
        return <div>BookingId not found</div>;
    }

    const id = parseInt(params.id);
    
    const { isLoading, isError, data, error } = useQuery<Booking, Error>(
        ["booking", params.id],
        () => getBookingById({ token: user.token, id: id })
      );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Booking not found</div>;
    }
    
    return (
        <div id="booking">
        <Typography sx={{mb:3}} variant="h5" component="h1" gutterBottom>
          Booking {data.id}
        </Typography>
        <Box sx={{mb:3}} justifyContent="space-between">
            <Typography variant="h5" component="h2" gutterBottom>
                Lead Guest Details
            </Typography>
            <Typography variant="body1" gutterBottom>
                Lead Guest Name: {data.leadGuest.firstName} {data?.leadGuest.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Lead Guest Email: {data.leadGuest.email}
            </Typography>
        </Box>
        <hr />
        <Box sx={{mb:3}} justifyContent="space-between">
            <Typography variant="h5" component="h2" gutterBottom>
                Booking Details
            </Typography>
            <Typography variant="body1" gutterBottom>
                Unit: {data.unit!.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Dates: {data.start.toLocaleString()} - {data.end.toLocaleString()}
            </Typography>
        </Box>
        <hr />
        <Box sx={{mb:3}} justifyContent="space-between">
            <Typography variant="h5" component="h2" gutterBottom>
                Occupant Details
            </Typography>
            <Box sx={{mb:3}} justifyContent="space-between">
                <Typography variant="h6" component="h2" gutterBottom>
                    Guests
                </Typography>
                <ul>
                    {data.guests?.map(guest => {
                        return <li>{guest.name} - {guest.age}</li>
                    })}
                </ul>
            </Box>
            <Box sx={{mb:3}} justifyContent="space-between">
                <Typography variant="h6" component="h2" gutterBottom>
                    Pets
                </Typography>
                <ul>
                    {data.pets?.map(pet => {
                        return <li>{pet.name}</li>
                    })}
                </ul>
            </Box>
            <Box sx={{mb:3}} justifyContent="space-between">
                <Typography variant="h6" component="h2" gutterBottom>
                    Vehicles
                </Typography>
                <ul>
                    {data.vehicles?.map(vehicle => {
                        return <li>{vehicle.vehicleReg}</li>
                    })}
                </ul>
            </Box>
        </Box>
        <hr />  
        <Box sx={{mb:3}} justifyContent="space-between">
        <Typography variant="h5" component="h1" gutterBottom>
                Finance Details
            </Typography>
        </Box>
        </div>
    );
}

export default IndividualBooking;