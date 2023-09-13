import React from "react";

type ResourceCalendarHeaderRowComponentProps = {
    /** mandatory, date array */
    dateArray: Date[]
    /** mandatory, column width */
    columnWidth: number
}

const ResourceCalendarHeaderRow = ({dateArray, columnWidth}: ResourceCalendarHeaderRowComponentProps) => {

    return (
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
    )
}

export default ResourceCalendarHeaderRow;