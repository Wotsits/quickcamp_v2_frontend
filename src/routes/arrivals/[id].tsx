import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Booking } from "../../types";
import { getBookingById } from "../../services/queries/getBookingById";
import { Alert, Box, Button, Divider, IconButton } from "@mui/material";
import LargeButton from "../../components/atoms/LargeButton";
import "./style.css";
import { isGuestDue } from "../../utils/helpers";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../../settings";
import { checkInOneGuest } from "../../services/mutations/checkInOneGuest";
import { checkInManyGuests } from "../../services/mutations/checkInManyGuests";
import { checkinAll, checkinOne } from "./helpers";
import PageHeader from "../../components/molecules/PageHeader";

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
  } = useQuery<{ data: Booking }, Error>(
    ["booking", params.id],
    () => getBookingById({ token: user.token, id: id }),
    {
      onSuccess(arrivalsData) {
        setGuests(arrivalsData.data.guests);
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
    onError: (err: Error) => {
      setError(
        err.message || "There has been an error checking in the party member."
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
    onError: (err: Error) => {
      setError(
        err.message || "There has been an error checking in the party member."
      );
    },
  });

  // -------------
  // RENDER
  // -------------

  if (
    isArrivalLoading ||
    guests === undefined
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
      <PageHeader title={`Arrival ${id}`}>
        <div id="individual-arrival-header-right">
          <IconButton
            size="small"
            onClick={() => {
              navigate(`${ROUTES.ROOT}${ROUTES.BOOKINGS}${id}`);
            }}
          >
            <EditIcon />
          </IconButton>
          <Button
            variant="contained"
            onClick={() =>
              checkinAll(
                guests,
                setGuests,
                checkInManyGuestsMutation,
                user.token,
                false
              )
            }
            disabled={
              guests.every((guest) => guest.checkedIn !== null) 
            }
          >
            CheckIn All
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              checkinAll(
                guests,
                setGuests,
                checkInManyGuestsMutation,
                user.token,
                true
              )
            }
            disabled={
              guests.every((guest) => guest.checkedIn === null) ||
              guests.every((guest) => guest.checkedOut !== null)
            }
          >
            Un-CheckIn All
          </Button>
        </div>
      </PageHeader>

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
              disabled={!isGuestDue(guest) || guest.checkedOut !== null}
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

        

        {/* VEHICLES */}

        <Divider variant="middle" sx={{ mb: 3 }}>
          Vehicles
        </Divider>


      </div>
    </div>
  );
};

export default IndividualArrival;
