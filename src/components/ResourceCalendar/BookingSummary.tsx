import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BookingSumm } from "../../types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../settings";

type BookingSummaryProps = {
  /** mandatory, booking object */
  booking: BookingSumm;
  /** mandatory, left position of booking block */
  positionLeft: string;
  /** mandatory, top position of booking block */
  positionTop: string;
  /** mandatory, callback to close booking summary */
  callbackOnClose: () => void;
};

const BookingSummary = ({
  booking,
  positionLeft,
  positionTop,
  callbackOnClose,
}: BookingSummaryProps) => {
  // ----------
  // HOOKS
  // ----------

  const navigate = useNavigate();

  // ----------
  // RENDER
  // ----------

  const {
    id,
    bookingName,
    unit,
    start,
    end,
    guests,
    pets,
    vehicles,
    paid,
    peopleCheckedIn,
    petsCheckedIn,
    vehiclesCheckedIn,
  } = booking;

  console.log(guests);
  const guestTypes = Object.keys(guests);

  return (
    <Card
      variant="outlined"
      style={{ position: "absolute", left: positionLeft, top: positionTop }}
      className="booking-summary"
    >
      <CardHeader
        action={[
          <IconButton
            onClick={() => navigate(ROUTES.ROOT + ROUTES.BOOKINGS + id)}
            aria-label="settings"
          >
            <MoreVertIcon />
          </IconButton>,
          <IconButton onClick={callbackOnClose} aria-label="close">
            <CloseIcon />
          </IconButton>,
        ]}
        title={bookingName}
        subheader={`Ref: ${id}`}
      />

      <CardContent>
        <div className="booking-summary-stay-details">
          <div>Unit: {unit}</div>
          <div>Start: {new Date(start).toLocaleString()}</div>
          <div>End: {new Date(end).toLocaleString()}</div>
        </div>

        <div className="booking-summary-occupant-details">
          {guestTypes.map((guestType) => (
            <div key={guestType}>
              {guestType}: {guests[guestType]}
            </div>
          ))}
          <div>Pets: {pets}</div>
          <div>Vehicles: {vehicles}</div>
        </div>

        <div className="booking-summary-finance-details">
          <div>Paid: {paid ? "Yes" : "No"}</div>
        </div>

        <div className="booking-summary-checkedin-details">
          <div>People Checked In: {peopleCheckedIn}</div>
          <div>Pets Checked In: {petsCheckedIn}</div>
          <div>Vehicles Checked In: {vehiclesCheckedIn}</div>
        </div>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="lock">
          <LockIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookingSummary;
