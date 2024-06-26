import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { ResourceGroup } from "./types";
import BookingsOverlay from "./BookingsOverlay";
import { generateDateArray } from "../../../utils/helpers";
import ResourceCalendarHeaderRow from "./ResourceCalendarHeaderRow";
import ResourceCalendarBody from "./ResourceCalendarBody";
import { BookingSumm } from "../../../types";
import { WIDTH_OF_BOOKING_CALENDAR } from "../../../settings";

type ResourceCalendarComponentProps = {
  /** mandatory, resources array */
  resources: ResourceGroup[];
  /** mandatory, bookings array */
  bookings: BookingSumm[];
  /** mandatory, start date */
  startDate: Date;
  /** mandatory, column width */
  columnWidth: number;
  /** optional, callback triggered on cell click */
  onCellClick?: (resourceId: string, reourceTypeId: string, start: Date) => void;
};

const ResourceCalendar = ({
  resources,
  bookings,
  startDate,
  columnWidth,
  onCellClick
}: ResourceCalendarComponentProps) => {
  // --------------------
  // STATE
  // --------------------

  const [numberOfNights] = useState(WIDTH_OF_BOOKING_CALENDAR);
  const [dateArray, setDateArray] = useState(
    generateDateArray(startDate, numberOfNights)
  );
  const [cells, setCells] = useState<HTMLTableCellElement[]>([]);
  const [hoveredItem, setHoveredItem] = useState(-1);

  // --------------------
  // USEEFFECTS
  // --------------------

  useEffect(() => {
    setDateArray(generateDateArray(startDate, numberOfNights));
  }, [startDate])

  useEffect(() => {
    const cells = document.querySelectorAll<HTMLTableCellElement>(
      "#resource-calendar-table-body .cell"
    );
    setCells(Array.from(cells));
  }, [columnWidth]);

  // --------------------
  // RENDER
  // --------------------

  return (
    <div id="resource-calendar" className="resource-calendar">

      {/* Calendar */}

      <table id="resource-calendar-table" className="resource-calendar-table">
        <ResourceCalendarHeaderRow dateArray={dateArray} columnWidth={columnWidth}/>
        <ResourceCalendarBody resources={resources} dateArray={dateArray} onCellClick={onCellClick} />
      </table>

      {/* Booking Overlay Layer */}

      <BookingsOverlay
        bookings={bookings}
        cells={cells}
        columnWidth={columnWidth}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
      />
      
    </div>
  );
};

export default ResourceCalendar;
