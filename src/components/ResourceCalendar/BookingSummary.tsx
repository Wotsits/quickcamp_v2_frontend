import React from "react";
import { Card, CardActions, CardContent, CardHeader, IconButton } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
};

const BookingSummary = ({
  booking,
  positionLeft,
  positionTop,
}: BookingSummaryProps) => {
  // ----------
  // HOOKS
  // ----------

  const navigate = useNavigate();

  // ----------
  // RENDER
  // ----------

  const {id, bookingName, unit, start, end, adults, children, infants, pets, vehicles, paid, peopleCheckedIn, petsCheckedIn, vehiclesCheckedIn} = booking

  return (
    <Card
      variant="outlined"
      style={{ position: "absolute", left: positionLeft, top: positionTop }}
      className="booking-summary"
    >
      <CardHeader
        action={
          <IconButton onClick={() => navigate(`/${ROUTES.BOOKINGS+id}`)} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
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
          <div>Adults: {adults}</div>
          <div>Children: {children}</div>
          <div>Infants: {infants}</div>
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
