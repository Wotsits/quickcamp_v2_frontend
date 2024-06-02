import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Booking } from "../../types";
import { getBookingById } from "../../services/queries/getBookingById";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import LargeButton from "../../components/atoms/LargeButton";
import "./style.css";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../../settings";
import { checkoutAll, checkoutOne } from "./helpers";
import { checkOutManyGuests } from "../../services/mutations/put/checkOutManyGuests";
import { checkOutOneGuest } from "../../services/mutations/put/checkOutOneGuest";
import PageHeader from "../../components/molecules/PageHeader";
import SiteContext from "../../contexts/sitesContext";

const IndividualDeparture = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);
  const { selectedSite } = useContext(SiteContext)

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
    isLoading: isDepartureLoading,
    isError: isDepartureError,
    data: departureData,
    error: departureError,
  } = useQuery<{ data: Booking }, Error>(
    ["booking", params.id],
    () => getBookingById({ token: user.token, id: id }),
    {
      onSuccess(res) {
        setGuests(res.data.guests);
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
    onError: (err: Error) => {
      setError(
        err.message ||
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
    onError: (err: Error) => {
      setError(
        err.message ||
        "There has been an error checking out the party member.  Please reload the application and try again."
      );
    },
  });

  // -------------
  // RENDER
  // -------------

  if (
    isDepartureLoading ||
    guests === undefined
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
    <div id="individual-departure" className="h-full flex-column">

      {/* HEADER */}

      <PageHeader title={`Departure ${id}`}>
        <div id="individual-departure-header-right">
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
              checkoutAll(
                guests,
                setGuests,
                checkOutManyGuestsMutation,
                user.token,
                false,
                selectedSite!.id
              )
            }
            disabled={
              guests.every((guest) => guest.checkedOut !== null)
            }
          >
            Check Out All
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              checkoutAll(
                guests,
                setGuests,
                checkOutManyGuestsMutation,
                user.token,
                true,
                selectedSite!.id
              )
            }
            disabled={
              guests.every((guest) => guest.checkedOut === null)
            }
          >
            Un-Check Out All
          </Button>
        </div>
      </PageHeader>

      {/* ERROR DISPLAY */}

      {error && (
        <div id="individual-departure-error">
          <Alert severity="error">{error}</Alert>
        </div>
      )}

      {/* GUEST BUTTONS */}

      <div id="arrival-button-container" className="flex-grow overflow-y-auto">
        {selectedSite && selectedSite.guestTypeGroups && selectedSite.guestTypeGroups.sort((a, b) => a.order - b.order).map(guestTypeGroup => (
          <div key={guestTypeGroup.id}>
            <Divider variant="middle" sx={{ mb: 3 }}>
              {guestTypeGroup.name}
            </Divider>

            <Box
              className={
                guests.length === 1 ? "button-grid one-column" : "button-grid"
              }
              sx={{ mb: 3 }}
            >
              {guests!.filter((guest) => guest.guestType?.guestTypeGroupId === guestTypeGroup.id).length === 0 && <div>No guests in this category</div>}
              {guests!.filter((guest) => guest.guestType?.guestTypeGroupId === guestTypeGroup.id).map(guest => {
                console.log(guest)
                return (
                  <LargeButton
                    key={guest.id}
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
                            false,
                            selectedSite!.id
                          )
                        : () =>
                          checkoutOne(
                            guest.id,
                            "GUEST",
                            guests,
                            setGuests,
                            checkOutOneGuestMutation,
                            user.token,
                            true,
                            selectedSite!.id
                          )
                    }
                    highlighted={guest.checkedOut !== null}
                    disabled={!guest.checkedIn}
                  >
                    <div>
                      {guest.name}
                      {!guest.checkedIn && <div>Not yet checked in</div>}
                    </div>
                  </LargeButton>
                )
              }
              )}
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualDeparture;
