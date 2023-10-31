import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BookingSummary from "./BookingSummary";
import { BookingSumm } from "../../types";

type BookingBlockProps = {
  /** mandatory, booking object */
  booking: BookingSumm;
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

  useEffect(() => {
    console.log("bookingSummaryVisible", bookingSummaryVisible);
  }, [bookingSummaryVisible]);

  function getTotalOccupants() {
    let guestsCount = 0;
    for (let guestType in booking.guests) {
      guestsCount += booking.guests[guestType];
    }
    return guestsCount;
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
    <>
      <div
        style={{
          position: "absolute",
          left: positionLeft,
          top: positionTop,
          width: width,
          backgroundColor: getBackgroundColor(),
        }}
        className="cell-overlay"
        onClick={() => setBookingSummaryVisible(true)}
      >
        {booking.bookingName}
        <span className="occupant-summary">{getTotalOccupants()}</span>
      </div>
      {bookingSummaryVisible &&
        createPortal(
          <BookingSummary
            booking={booking}
            positionLeft={positionLeft}
            positionTop={positionTop}
            callbackOnClose={() => {
              setBookingSummaryVisible(false);
            }}
          />,
          document.querySelector("#resource-calendar") as HTMLElement
        )}
    </>
  );
};

export default BookingBlock;
