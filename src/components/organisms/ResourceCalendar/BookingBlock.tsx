import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BookingSummary from "./BookingSummary";
import { BookingSumm } from "../../../types";
import Diversity3Icon from '@mui/icons-material/Diversity3';

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
  /** optional, boolean flag indicating whether the item is highlighted */
  highlighted?: boolean;
  /** optional, callback to set the hovered item state in the parent. */
  setHighlighted?: (id: number) => void
};

const BookingBlock = ({
  booking,
  positionLeft,
  positionTop,
  columnWidth,
  numberOfNightsRemaining,
  highlighted,
  setHighlighted
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

  function isPartOfGroup() {
    return booking.sizeOfGroup > 1
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
          boxShadow: highlighted ? "0 0 5px 0 rgba(0,0,0,0.5)" : "none"
        }}
        className="cell-overlay"
        onClick={() => setBookingSummaryVisible(true)}
        onMouseOver={setHighlighted ? () => setHighlighted(booking.bookingGroupId) : undefined}
        onMouseLeave={setHighlighted ? () => setHighlighted(-1) : undefined}
      >
        {booking.bookingName}
        <span className="occupant-summary">{getTotalOccupants()}</span>
        {isPartOfGroup() && <Diversity3Icon sx={{ml: 1}}/>}
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
