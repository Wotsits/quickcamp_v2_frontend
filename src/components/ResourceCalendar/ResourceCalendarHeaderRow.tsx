import React from "react";
import { WEEKENDHIGHLIGHT } from "../../settings";

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
              return (
                <th
                  key={date.toString()}
                  style={{
                    minWidth: columnWidth.toString() + "px",
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