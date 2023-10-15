import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useQuery } from "react-query";
import { Booking } from "../../types";
import { getBookingById } from "../../services/queries/getBookingById";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LargeButton from "../../components/LargeButton";

const IndividualArrival = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // HOOKS
  // -------------

  const params = useParams();

  if (!params || !params.id) {
    return <div>BookingId not found</div>;
  }

  const id = parseInt(params.id);

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data, error } = useQuery<Booking, Error>(
    ["booking", params.id],
    () => getBookingById({ token: user.token, id: id })
  );

  // -------------
  // EVENT HANDLERS
  // -------------

  function checkinOne(guestId: number, type: "GUEST" | "PET" | "VEHICLE") {
    console.log("Checking in: ", type, guestId);
  }

  function checkinAll() {
    console.log("Checking in all");
  }

  // -------------
  // RENDER
  // -------------

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
    <div id="individual-arrival">
      <Typography sx={{ mb: 3 }} variant="h5" component="h1" gutterBottom>
        Arrival {id}
      </Typography>

      {/* CHECKIN ALL */}

      <Box sx={{ mb: 3 }}>
        <LargeButton onClick={() => checkinAll()} highlighted={false}>
          Checkin All
        </LargeButton>
      </Box>

      {/* PEOPLE */}

      <Typography variant="h6" gutterBottom>
        People Arriving
      </Typography>
      <Box sx={{ mb: 3 }} display="flex" justifyContent="space-between">
        {data.guests!.map((guest) => (
          <LargeButton
            onClick={() => checkinOne(guest.id, "GUEST")}
            highlighted={false}
          >
            {guest.name}
          </LargeButton>
        ))}
      </Box>

      {/* PETS */}

      <Typography variant="h6" gutterBottom>
        Pets Arriving
      </Typography>
      <Box sx={{ mb: 3 }} display="flex" justifyContent="space-between">
        {data.pets!.map((pet) => (
          <LargeButton
            onClick={() => checkinOne(pet.id, "GUEST")}
            highlighted={false}
          >
            {pet.name}
          </LargeButton>
        ))}
      </Box>

      {/* VEHICLES */}

      <Typography variant="h6" gutterBottom>
        Vehicles Arriving
      </Typography>
      <Box sx={{ mb: 3 }} display="flex" justifyContent="space-between">
        {data.vehicles!.map((vehicle) => (
          <LargeButton
            onClick={() => checkinOne(vehicle.id, "GUEST")}
            highlighted={false}
          >
            {vehicle.vehicleReg}
          </LargeButton>
        ))}
      </Box>
    </div>
  );
};

export default IndividualArrival;
