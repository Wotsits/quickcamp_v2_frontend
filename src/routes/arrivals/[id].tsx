import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Booking, BookingGuest, BookingPet, BookingVehicle } from "../../types";
import { getBookingById } from "../../services/queries/getBookingById";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import LargeButton from "../../components/LargeButton";
import "./style.css";
import { isGuestDue } from "../../utils/helpers";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../../settings";
import { checkInOneGuest } from "../../services/mutations/checkInOneGuest";
import { checkInManyGuests } from "../../services/mutations/checkInManyGuests";
import { checkinAll, checkinOne } from "./helpers";
import { set } from "date-fns";

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

  const [error, setError] = React.useState<string | undefined>(undefined);

  // -------------
  // HOOKS
  // -------------

  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!params || !params.id) {
    return <div>BookingId not found</div>;
  }

  const id = parseInt(params.id);

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading: isArrivalLoading,
    isError: isArrivalError,
    data: arrivalData,
    error: arrivalError,
  } = useQuery<Booking, Error>(
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
      // invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["booking", id],
      });
      queryClient.refetchQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["arrivalsByDate"],
      });
    },
    onError: (err) => {
      setError(
        "There has been an error checking in the party member.  Please reload the application and try again."
      );
    },
  });

  const checkInManyGuestsMutation = useMutation({
    mutationFn: checkInManyGuests,
    onSuccess: (res) => {
      // invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["booking", id],
      });
      queryClient.refetchQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["arrivalsByDate"],
      });
    },
    onError: (err) => {
      setError(
        "There has been an error checking in the party member.  Please reload the application and try again."
      );
    },
  });

  // -------------
  // RENDER
  // -------------

  if (
    isArrivalLoading ||
    guests === undefined ||
    pets === undefined ||
    vehicles === undefined
  ) {
    return <div>Loading...</div>;
  }

  if (isArrivalError) {
    return <div>Error: {arrivalError.message}</div>;
  }

  if (!arrivalData) {
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
          <Button
            variant="contained"
            onClick={() =>
              checkinAll(
                guests,
                setGuests,
                pets,
                setPets,
                vehicles,
                setVehicles,
                checkInManyGuestsMutation,
                user.token,
                false
              )
            }
            sx={{ mb: 3 }}
          >
            CheckIn All
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              checkinAll(
                guests,
                setGuests,
                pets,
                setPets,
                vehicles,
                setVehicles,
                checkInManyGuestsMutation,
                user.token,
                true
              )
            }
            sx={{ mb: 3, ml: 1 }}
          >
            Un-CheckIn All
          </Button>
        </div>
      </div>

      {error && (
        <div id="individual-arrival-error">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

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
                  ? () =>
                      checkinOne(
                        guest.id,
                        "GUEST",
                        guests,
                        setGuests,
                        checkInOneGuestMutation,
                        user.token,
                        false
                      )
                  : () =>
                      checkinOne(
                        guest.id,
                        "GUEST",
                        guests,
                        setGuests,
                        checkInOneGuestMutation,
                        user.token,
                        true
                      )
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
                  ? () =>
                      checkinOne(
                        pet.id,
                        "PET",
                        pets,
                        setPets,
                        checkInOneGuestMutation,
                        user.token,
                        false
                      )
                  : () =>
                      checkinOne(
                        pet.id,
                        "PET",
                        pets,
                        setPets,
                        checkInOneGuestMutation,
                        user.token,
                        true
                      )
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
                  ? () =>
                      checkinOne(
                        vehicle.id,
                        "VEHICLE",
                        vehicles,
                        setVehicles,
                        checkInOneGuestMutation,
                        user.token,
                        false
                      )
                  : () =>
                      checkinOne(
                        vehicle.id,
                        "VEHICLE",
                        vehicles,
                        setVehicles,
                        checkInOneGuestMutation,
                        user.token,
                        true
                      )
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
