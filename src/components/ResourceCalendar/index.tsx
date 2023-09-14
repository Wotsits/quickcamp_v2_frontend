import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { BookingSumm, ResourceGroup } from "./types";
import BookingsOverlay from "./BookingsOverlay";
import { generateDateArray } from "../../utils/helpers";
import ColumnWidthSlider from "./ColumnWidthSlider";
import ResourceCalendarHeaderRow from "./ResourceCalendarHeaderRow";
import ResourceCalendarBody from "./ResourceCalendarBody";

type ResourceCalendarComponentProps = {
  /** mandatory, resources array */
  resources: ResourceGroup[];
  /** mandatory, bookings array */
  bookings: BookingSumm[];
};

const ResourceCalendar = ({
  resources,
  bookings,
}: ResourceCalendarComponentProps) => {
  // --------------------
  // STATE
  // --------------------

  const [startDate, setStartDate] = useState(new Date());
  const [numberOfNights, setNumberOfNights] = useState(28);
  const [dateArray, setDateArray] = useState(
    generateDateArray(startDate, numberOfNights)
  );
  const [columnWidth, setColumnWidth] = useState(100);
  const [cells, setCells] = useState<HTMLTableCellElement[]>([]);

  // --------------------
  // USEEFFECTS
  // --------------------

  useEffect(() => {
    const cells = document.querySelectorAll<HTMLTableCellElement>(
      "#resource-calendar-table-body .cell"
    );
    setCells(Array.from(cells));
  }, []);

  // --------------------
  // RENDER
  // --------------------

  return (
    <div id="resource-calendar" className="resource-calendar">
      {/* Controls */}

      <ColumnWidthSlider
        columnWidth={columnWidth}
        setColumnWidth={setColumnWidth}
      />

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
