import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

type BookingConfirmationProps = {
    bookingId: number;
}

const BookingConfirmation = ({bookingId}: BookingConfirmationProps) => {
    return (
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          sx={{ mb: 3 }}
        >
          <Typography variant="h6" component="h1">
            Your booking has been created successfully.
          </Typography>
          <Typography variant="body1">
            <Link to={`/bookings/${bookingId}`}>View the booking.</Link>
          </Typography>
          <Typography variant="body1">
            <Link to="/bookings/">Return to the bookings list.</Link>
          </Typography>
          <Typography variant="body1">
            <Link to="/calendar/">
              Return to the bookings calendar.
            </Link>
          </Typography>
        </Box>
    )
}

export default BookingConfirmation