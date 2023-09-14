import React from "react";
import { BookingSumm } from "./types";
import { Card, CardActions, CardContent, CardHeader, IconButton } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  return (
    <Card
      variant="outlined"
      style={{ position: "absolute", left: positionLeft, top: positionTop }}
      className="booking-summary"
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={booking.bookingName}
        subheader={`Ref: ${booking.id}`}
      />

      <CardContent>
        <div className="booking-summary-header">
          <span className="booking-name">{booking.bookingName}</span>
          <span>Ref: {booking.id}</span>
        </div>

        <div className="booking-summary-stay-details">
          <div>Unit: {booking.unit}</div>
          <div>Start: {new Date(booking.start).toLocaleString()}</div>
          <div>End: {new Date(booking.end).toLocaleString()}</div>
        </div>

        <div className="booking-summary-occupant-details">
          <div>Adults: {booking.adults}</div>
          <div>Children: {booking.children}</div>
          <div>Infants: {booking.infants}</div>
          <div>Pets: {booking.pets}</div>
          <div>Vehicles: {booking.vehicles}</div>
        </div>

        <div className="booking-summary-finance-details">
          <div>Paid: {booking.paid ? "Yes" : "No"}</div>
        </div>

        <div className="booking-summary-checkedin-details">
          <div>People Checked In: {booking.peopleCheckedIn}</div>
          <div>Pets Checked In: {booking.petsCheckedIn}</div>
          <div>Vehicles Checked In: {booking.vehiclesCheckedIn}</div>
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
