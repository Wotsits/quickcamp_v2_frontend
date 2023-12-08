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
import { checkoutAll, checkoutOne } from "./helpers";
import { checkOutManyGuests } from "../../services/mutations/checkOutManyGuests";
import { checkOutOneGuest } from "../../services/mutations/checkOutOneGuest";

const IndividualDeparture = () => {
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
    isLoading: isDepartureLoading,
    isError: isDepartureError,
    data: departureData,
    error: departureError,
  } = useQuery<{data: Booking}, Error>(
    ["booking", params.id],
    () => getBookingById({ token: user.token, id: id }),
    {
      onSuccess(res) {
        setGuests(res.data.guests);
        setPets(res.data.pets);
        setVehicles(res.data.vehicles);
      },
    }
  );

  // -------------
  // MUTATIONS
  // -------------

  const checkOutOneGuestMutation = useMutation({
    mutationFn: checkOutOneGuest,
    onSuccess: (res) => {
      // invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["booking", id],
      });
      queryClient.refetchQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["depaturesByDate"],
      });
    },
    onError: (err) => {
      setError(
        "There has been an error checking out the party member.  Please reload the application and try again."
      );
    },
  });

  const checkOutManyGuestsMutation = useMutation({
    mutationFn: checkOutManyGuests,
    onSuccess: (res) => {
      // invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["booking", id],
      });
      queryClient.refetchQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["departuresByDate"],
      });
    },
    onError: (err) => {
      setError(
        "There has been an error checking out the party member.  Please reload the application and try again."
      );
    },
  });

  // -------------
  // RENDER
  // -------------

  if (
    isDepartureLoading ||
    guests === undefined ||
    pets === undefined ||
    vehicles === undefined
  ) {
    return <div>Loading...</div>;
  }

  if (isDepartureError) {
    return <div>Error: {departureError.message}</div>;
  }

  if (!departureData) {
    return <div>Booking not found</div>;
  }

  return (
    <div id="individual-departure">
      <div id="individual-departure-header">
        <div id="individual-departure-header-left">
          <Typography sx={{ mb: 3 }} variant="h5" component="h1" gutterBottom>
            Departure {id}
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
        <div id="individual-departure-header-right">
          <Button
            variant="contained"
            onClick={() =>
              checkoutAll(
                guests,
                setGuests,
                pets,
                setPets,
                vehicles,
                setVehicles,
                checkOutManyGuestsMutation,
                user.token,
                false
              )
            }
            sx={{ mb: 3 }}
          >
            Check Out All
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              checkoutAll(
                guests,
                setGuests,
                pets,
                setPets,
                vehicles,
                setVehicles,
                checkOutManyGuestsMutation,
                user.token,
                true
              )
            }
            sx={{ mb: 3, ml: 1 }}
          >
            Un-Check Out All
          </Button>
        </div>
      </div>

      {error && (
        <div id="individual-departure-error">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

      {/* PEOPLE */}

      <div id="departure-button-container">
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
                !guest.checkedOut
                  ? () =>
                      checkoutOne(
                        guest.id,
                        "GUEST",
                        guests,
                        setGuests,
                        checkOutOneGuestMutation,
                        user.token,
                        false
                      )
                  : () =>
                      checkoutOne(
                        guest.id,
                        "GUEST",
                        guests,
                        setGuests,
                        checkOutOneGuestMutation,
                        user.token,
                        true
                      )
              }
              highlighted={guest.checkedOut !== null}
              disabled={!guest.checkedIn}
            >
              <div>
                {guest.name}
                {!(guest.checkedIn) && <div>Not yet checked in</div>}
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
                !pet.checkedOut
                  ? () =>
                      checkoutOne(
                        pet.id,
                        "PET",
                        pets,
                        setPets,
                        checkOutOneGuestMutation,
                        user.token,
                        false
                      )
                  : () =>
                      checkoutOne(
                        pet.id,
                        "PET",
                        pets,
                        setPets,
                        checkOutOneGuestMutation,
                        user.token,
                        true
                      )
              }
              highlighted={pet.checkedOut !== null}
              disabled={!pet.checkedIn}
            >
              <div>
                {pet.name}
                {!pet.checkedIn && <div>Not yet checked in</div>}
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
                !vehicle.checkedOut
                  ? () =>
                      checkoutOne(
                        vehicle.id,
                        "VEHICLE",
                        vehicles,
                        setVehicles,
                        checkOutOneGuestMutation,
                        user.token,
                        false
                      )
                  : () =>
                      checkoutOne(
                        vehicle.id,
                        "VEHICLE",
                        vehicles,
                        setVehicles,
                        checkOutOneGuestMutation,
                        user.token,
                        true
                      )
              }
              highlighted={vehicle.checkedOut !== null}
              disabled={!vehicle.checkedIn}
            >
              <div>
                {vehicle.vehicleReg}
                {!vehicle.checkedIn && <div>Not yet checked in</div>}
              </div>
            </LargeButton>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default IndividualDeparture;
