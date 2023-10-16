import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useQuery } from "react-query";
import { Booking } from "../../types";
import { getBookingById } from "../../services/queries/getBookingById";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import LargeButton from "../../components/LargeButton";
import "./style.css";

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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ mb: 3 }} variant="h5" component="h1" gutterBottom>
          Arrival {id}
        </Typography>
        <Button variant="contained" onClick={checkinAll} sx={{mb: 3}}>
          Check-in All
        </Button>
      </Box>

      {/* PEOPLE */}

      <Divider variant="middle" sx={{ mb: 3 }}>
        People
      </Divider>

      <Box className={data.guests!.length === 1 ? "button-grid one-column" : "button-grid"} sx={{ mb: 3 }}>
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

      <Divider variant="middle" sx={{ mb: 3 }}>
        Pets
      </Divider>

      <Box className={data.pets!.length === 1 ? "button-grid one-column" : "button-grid"} sx={{ mb: 3 }}>
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

      <Divider variant="middle" sx={{ mb: 3 }}>
        Vehicles
      </Divider>

      <Box className={data.vehicles!.length === 1 ? "button-grid one-column" : "button-grid"} sx={{ mb: 3 }}>
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
