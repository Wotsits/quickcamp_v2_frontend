import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { ResourceGroup } from "./types";
import BookingsOverlay from "./BookingsOverlay";
import { generateDateArray } from "../../utils/helpers";
import ResourceCalendarHeaderRow from "./ResourceCalendarHeaderRow";
import ResourceCalendarBody from "./ResourceCalendarBody";
import { BookingSumm } from "../../types";

type ResourceCalendarComponentProps = {
  /** mandatory, resources array */
  resources: ResourceGroup[];
  /** mandatory, bookings array */
  bookings: BookingSumm[];
  /** mandatory, start date */
  startDate: Date;
  /** mandatory, column width */
  columnWidth: number;
};

const ResourceCalendar = ({
  resources,
  bookings,
  startDate,
  columnWidth
}: ResourceCalendarComponentProps) => {
  // --------------------
  // STATE
  // --------------------

  const [numberOfNights] = useState(28);
  const [dateArray, setDateArray] = useState(
    generateDateArray(startDate, numberOfNights)
  );
  const [cells, setCells] = useState<HTMLTableCellElement[]>([]);

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
        <ResourceCalendarBody resources={resources} dateArray={dateArray} />
      </table>

      {/* Booking Overlay Layer */}

      <BookingsOverlay
        bookings={bookings}
        cells={cells}
        columnWidth={columnWidth}
      />
      
    </div>
  );
};

export default ResourceCalendar;
