import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useMutation, useQuery } from "react-query";
import { Booking, BookingGuest, BookingPet, BookingVehicle } from "../../types";
import { getBookingById } from "../../services/queries/getBookingById";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import LargeButton from "../../components/LargeButton";
import "./style.css";
import { isGuestDue } from "../../utils/helpers";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../../settings";
import { checkInOneGuest } from "../../services/mutations/checkInOneGuest";

const IndividualArrival = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // STATE
  // -------------

  const [guests, setGuests] = React.useState<Booking["guests"] | undefined>(
    undefined
  );
  const [pets, setPets] = React.useState<Booking["pets"] | undefined>(
    undefined
  );
  const [vehicles, setVehicles] = React.useState<
    Booking["vehicles"] | undefined
  >(undefined);

  // -------------
  // HOOKS
  // -------------

  const params = useParams();
  const navigate = useNavigate();

  if (!params || !params.id) {
    return <div>BookingId not found</div>;
  }

  const id = parseInt(params.id);

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data, error } = useQuery<Booking, Error>(
    ["booking", params.id],
    () => getBookingById({ token: user.token, id: id }),
    {
      onSuccess(data) {
        setGuests(data.guests);
        setPets(data.pets);
        setVehicles(data.vehicles);
      },
    }
  );

  // -------------
  // MUTATIONS
  // -------------

  const checkInOneGuestMutation = useMutation({
    mutationFn: checkInOneGuest,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // -------------
  // EVENT HANDLERS
  // -------------

  function checkinOne(guestId: number, type: "GUEST" | "PET" | "VEHICLE") {
    const now = new Date();
    let cpy: BookingGuest[] | BookingPet[] | BookingVehicle[] = [];

    if (type === "GUEST") cpy = [...guests!];
    if (type === "PET") cpy = [...pets!];
    if (type === "VEHICLE") cpy = [...vehicles!];

    const target = cpy.find((item) => item.id === guestId);

    if (target) {
      if (isGuestDue(target)) {
        target.checkedIn = now;
      }
    }

    if (type === "GUEST") setGuests(cpy as BookingGuest[]);
    if (type === "PET") setPets(cpy as BookingPet[]);
    if (type === "VEHICLE") setVehicles(cpy as BookingVehicle[]);

    // TODO: Update the database
    checkInOneGuestMutation.mutate({ token: user.token, id: guestId, type });

  }

  function unCheckinOne(guestId: number, type: "GUEST" | "PET" | "VEHICLE") {
    let cpy: BookingGuest[] | BookingPet[] | BookingVehicle[] = [];

    if (type === "GUEST") cpy = [...guests!];
    if (type === "PET") cpy = [...pets!];
    if (type === "VEHICLE") cpy = [...vehicles!];

    const target = cpy.find((item) => item.id === guestId);

    if (target) {
      target.checkedIn = null;
    }

    if (type === "GUEST") setGuests(cpy as BookingGuest[]);
    if (type === "PET") setPets(cpy as BookingPet[]);
    if (type === "VEHICLE") setVehicles(cpy as BookingVehicle[]);
  
    // TODO: Update the database
  }

  function checkinAll() {
    const guestsCpy = [...guests!];
    const petsCpy = [...pets!];
    const vehiclesCpy = [...vehicles!];

    const now = new Date();

    guestsCpy.forEach((guest) => {
      if (isGuestDue(guest)) guest.checkedIn = now;
    });
    petsCpy.forEach((pet) => {
      if (isGuestDue(pet)) pet.checkedIn = now;
    });
    vehiclesCpy.forEach((vehicle) => {
      if (isGuestDue(vehicle)) vehicle.checkedIn = now;
    });

    setGuests(guestsCpy);
    setPets(petsCpy);
    setVehicles(vehiclesCpy);
  }

  function unCheckinAll() {
    const guestsCpy = [...guests!];
    const petsCpy = [...pets!];
    const vehiclesCpy = [...vehicles!];

    guestsCpy.forEach((guest) => {
      guest.checkedIn = null;
    });
    petsCpy.forEach((pet) => {
      pet.checkedIn = null;
    });
    vehiclesCpy.forEach((vehicle) => {
      vehicle.checkedIn = null;
    });

    setGuests(guestsCpy);
    setPets(petsCpy);
    setVehicles(vehiclesCpy);
  }

  // -------------
  // RENDER
  // -------------

  if (
    isLoading ||
    guests === undefined ||
    pets === undefined ||
    vehicles === undefined
  ) {
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
      <div id="individual-arrival-header">
        <div id="individual-arrival-header-left">
          <Typography sx={{ mb: 3 }} variant="h5" component="h1" gutterBottom>
            Arrival {id}
            <IconButton
              size="small"
              onClick={() => {
                navigate(`${ROUTES.ROOT}${ROUTES.BOOKINGS}${id}`);
              }}
            >
              <EditIcon />
            </IconButton>
          </Typography>
        </div>
        <div id="individual-arrival-header-right">
          <Button variant="contained" onClick={checkinAll} sx={{ mb: 3 }}>
            CheckIn All
          </Button>
          <Button
            variant="contained"
            onClick={unCheckinAll}
            sx={{ mb: 3, ml: 1 }}
          >
            Un-CheckIn All
          </Button>
        </div>
      </div>

      {/* PEOPLE */}

      <div id="arrival-button-container">
        <Divider variant="middle" sx={{ mb: 3 }}>
          People
        </Divider>

        <Box
          className={
            guests.length === 1 ? "button-grid one-column" : "button-grid"
          }
          sx={{ mb: 3 }}
        >
          {guests!.map((guest) => (
            <LargeButton
              onClick={
                !guest.checkedIn
                  ? () => checkinOne(guest.id, "GUEST")
                  : () => unCheckinOne(guest.id, "GUEST")
              }
              highlighted={guest.checkedIn !== null}
              disabled={!isGuestDue(guest)}
            >
              <div>
                {guest.name}
                {!isGuestDue(guest) && <div>Not yet due</div>}
              </div>
            </LargeButton>
          ))}
        </Box>

        {/* PETS */}

        <Divider variant="middle" sx={{ mb: 3 }}>
          Pets
        </Divider>

        <Box
          className={
            pets!.length === 1 ? "button-grid one-column" : "button-grid"
          }
          sx={{ mb: 3 }}
        >
          {pets.map((pet) => (
            <LargeButton
              onClick={
                !pet.checkedIn
                  ? () => checkinOne(pet.id, "PET")
                  : () => unCheckinOne(pet.id, "PET")
              }
              highlighted={pet.checkedIn !== null}
              disabled={!isGuestDue(pet)}
            >
              <div>
                {pet.name}
                {!isGuestDue(pet) && <div>Not yet due</div>}
              </div>
            </LargeButton>
          ))}
        </Box>

        {/* VEHICLES */}

        <Divider variant="middle" sx={{ mb: 3 }}>
          Vehicles
        </Divider>

        <Box
          className={
            vehicles.length === 1 ? "button-grid one-column" : "button-grid"
          }
          sx={{ mb: 3 }}
        >
          {vehicles!.map((vehicle) => (
            <LargeButton
              onClick={
                !vehicle.checkedIn
                  ? () => checkinOne(vehicle.id, "VEHICLE")
                  : () => unCheckinOne(vehicle.id, "VEHICLE")
              }
              highlighted={vehicle.checkedIn !== null}
              disabled={!isGuestDue(vehicle)}
            >
              <div>
                {vehicle.vehicleReg}
                {!isGuestDue(vehicle) && <div>Not yet due</div>}
              </div>
            </LargeButton>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default IndividualArrival;
