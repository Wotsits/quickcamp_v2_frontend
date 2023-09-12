import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Booking, ResourceGroup } from "./types";
import BookingsOverlay from "./BookingsOverlay";
import { generateDateArray } from "../../utils/helpers";

type ResourceCalendarComponentProps = {
  resources: ResourceGroup[];
  bookings: Booking[];
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
      {/* Width Selector */}

      <span>Column Width: </span>
      <input
        type="range"
        min={30}
        max={250}
        value={columnWidth}
        onChange={(e) => setColumnWidth(parseInt(e.target.value))}
      />

      {/* Calendar */}

      <table id="resource-calendar-table" className="resource-calendar-table">
        {/* HEADER */}

        <thead
          id="resource-calendar-table-header"
          className="resource-calendar-table-header"
        >
          <tr>
            <th className="min-width-150">Resource</th>
            {dateArray.map((date) => {
              const day = date.getDay();
              const isWeekend = day === 0 || day === 6;
              return (
                <th
                  style={{
                    minWidth: columnWidth.toString() + "px",
                    backgroundColor: isWeekend ? "lightgrey" : "none",
                  }}
                >
                  {date.toDateString()}
                </th>
              );
            })}
          </tr>
        </thead>

        {/* BODY */}

        <tbody
          id="resource-calendar-table-body"
          className="resource-calendar-table-body"
        >
          {resources.map((resourceGroup) => (
            <>
              <tr>
                <td colSpan={10000}>{resourceGroup.class}</td>
              </tr>
              {resourceGroup.resources.map((resource) => (
                <tr>
                  <td>{resource.name}</td>
                  {dateArray.map((date) => {
                    const day = date.getDay();
                    const isWeekend = day === 0 || day === 6;
                    return (
                      <td
                        style={{
                          backgroundColor: isWeekend ? "lightgrey" : "none",
                        }}
                        className="cell"
                        data-unit={resource.id}
                        data-start={date}
                      />
                    );
                  })}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>

      <BookingsOverlay bookings={bookings} cells={cells} columnWidth={columnWidth}/>

    </div>
  );
};

export default ResourceCalendar;
