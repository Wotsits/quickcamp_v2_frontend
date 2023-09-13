import React, { useState } from "react";
import { Booking } from "./types";
import { createPortal } from "react-dom";
import BookingSummary from "./BookingSummary";

type BookingBlockProps = {
  /** mandatory, booking object */
  booking: Booking;
  /** mandatory, left position of booking block */
  positionLeft: string;
  /** mandatory, top position of booking block */
  positionTop: string;
  /** mandatory, width of booking block */
  columnWidth: number;
  /** mandatory, number of nights remaining in booking */
  numberOfNightsRemaining: number;
};

const BookingBlock = ({
  booking,
  positionLeft,
  positionTop,
  columnWidth,
  numberOfNightsRemaining,
}: BookingBlockProps) => {
  // -------------
  // STATE
  // -------------

  const [bookingSummaryVisible, setBookingSummaryVisible] = useState(false);

  const width = numberOfNightsRemaining * columnWidth + "px";

  // -------------
  // HELPER
  // -------------

  function getTotalOccupants() {
    const adults = booking.adults;
    const children = booking.children;
    const infants = booking.infants;
    return adults + children + infants;
  }

  function getBackgroundColor() {
    if (booking.paid && booking.peopleCheckedIn === getTotalOccupants()) {
      return "green";
    } else if (
      booking.paid &&
      booking.peopleCheckedIn !== getTotalOccupants()
    ) {
      return "orange";
    } else {
      return "red";
    }
  }

  // -------------
  // RENDER
  // -------------

  return (
    <div
      style={{
        position: "absolute",
        left: positionLeft,
        top: positionTop,
        width: width,
        backgroundColor: getBackgroundColor(),
      }}
      className="cell-overlay"
      onMouseEnter={() => setBookingSummaryVisible(true)}
      onMouseLeave={() => setBookingSummaryVisible(false)}
    >
      {booking.bookingName}
      <span className="occupant-summary">{getTotalOccupants()}</span>
      {bookingSummaryVisible &&
        createPortal(
          <BookingSummary booking={booking} positionLeft={positionLeft} positionTop={positionTop} />,
          document.body
        )}
    </div>
  );
};

export default BookingBlock;
