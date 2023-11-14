import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { Booking } from "../../types";
import { getBookingById } from "../../services/queries/getBookingById";
import "./style.css";

const IndividualBooking = () => {
  const { user } = useContext(AuthContext);
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
      <Typography sx={{ mb: 3 }} variant="h5" component="h1" gutterBottom>
        Booking {data.id}
      </Typography>

      <div id="booking-information-container">
        <div className="booking-information-section">
          <Typography variant="h5" component="h2" gutterBottom>
            Lead Guest Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lead Guest Name: {data.leadGuest.firstName}{" "}
            {data?.leadGuest.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lead Guest Email: {data.leadGuest.email}
          </Typography>
        </div>
        <div className="booking-information-section">
          <Typography variant="h5" component="h2" gutterBottom>
            Booking Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Unit: {data.unit!.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Dates: {new Date(data.start).toUTCString()} - {new Date(data.end).toUTCString()}
          </Typography>
        </div>
        <div className="booking-information-section">
          <Typography variant="h5" component="h2" gutterBottom>
            Occupant Details
          </Typography>
          <Box sx={{ mb: 3 }} justifyContent="space-between">
            <Typography variant="h6" component="h2" gutterBottom>
              Guests
            </Typography>
            <ul>
              {data.guests?.map((guest) => {
                const name = guest.name;
                const type = guest.guestType!.name;
                const start = new Date(guest.start).toUTCString();
                const end = new Date(guest.end).toUTCString();
                return (
                  <li>
                    {name} - {type} - Arrives: {start} - Departs: {end}
                  </li>
                );
              })}
            </ul>
          </Box>
          <Box sx={{ mb: 3 }} justifyContent="space-between">
            <Typography variant="h6" component="h2" gutterBottom>
              Pets
            </Typography>
            <ul>
              {data.pets?.map((pet) => {
                const name = pet.name;
                const start = new Date(pet.start).toUTCString();
                const end = new Date(pet.end).toUTCString();
                return <li>{name} - Arrives: {start} - Departs {end}</li>;
              })}
            </ul>
          </Box>
          <Box sx={{ mb: 3 }} justifyContent="space-between">
            <Typography variant="h6" component="h2" gutterBottom>
              Vehicles
            </Typography>
            <ul>
              {data.vehicles?.map((vehicle) => {
                const reg = vehicle.vehicleReg;
                const start = new Date(vehicle.start).toUTCString();
                const end = new Date(vehicle.end).toUTCString();
                return <li>{reg} - Arrives: {start} - Departs: {end}</li>;
              })}
            </ul>
          </Box>
        </div>
        <div className="booking-information-section">
          <Typography variant="h5" component="h1" gutterBottom>
            Finance Details
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default IndividualBooking;
