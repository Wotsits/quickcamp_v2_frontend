import React from "react";
import { WEEKENDHIGHLIGHT } from "../../settings";
import { Typography } from "@mui/material";

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
            <Typography variant="body2" component="th" className="min-width-150"></Typography>
            {dateArray.map((date) => {
              return (
                <Typography
                  variant="body2"
                  component="th"
                  key={date.toString()}
                  style={{
                    minWidth: columnWidth.toString() + "px",
                  }}
                >
                  {date.toDateString()}
                </Typography>
              );
            })}
          </tr>
        </thead>
    )
}

export default ResourceCalendarHeaderRow;