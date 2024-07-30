import React, { Fragment } from 'react';
import { ResourceGroup } from './types';
import { WEEKENDHIGHLIGHT } from '../../../settings';
import { isWeekend } from '../../../utils/helpers';
import { Typography } from '@mui/material';

type ResourceCalendarBodyComponentProps = {
    /** mandatory, resources array */
    resources: ResourceGroup[],
    /** mandatory, date array */
    dateArray: Date[]
    /** optional, callback triggered on cell click */
    onCellClick?: (resourceId: string, resourceTypeId: string, start: Date) => void
}

const ResourceCalendarBody = ({resources, dateArray, onCellClick}: ResourceCalendarBodyComponentProps) => {
    return (
        <tbody
          id="resource-calendar-table-body"
          className="resource-calendar-table-body"
        >
          {resources.map((resourceGroup) => (
            <Fragment key={resourceGroup.resourceTypeName}>
              <tr className="resource-class-section-header head-col">
                <td className="head-col">{resourceGroup.resourceTypeName}</td>
              </tr>
              {resourceGroup.resources.map((resource) => (
                <tr key={resource.id.toString()}>
                  <Typography variant="body2" component="td" className="head-col">{resource.name}</Typography>
                  {dateArray.map((date) => {
                    const start = new Date(new Date(date).setHours(12, 0, 0, 0));
                    return (
                      <td
                        key={date.toString()}
                        style={{
                          backgroundColor: isWeekend(date) ? WEEKENDHIGHLIGHT : "none",
                          cursor: onCellClick ? "pointer" : "default",
                        }}
                        className="cell"
                        data-unit={resource.id}
                        data-midpoint={date}
                        data-start={start}
                        onClick={() => { 
                          if(onCellClick) {
                            onCellClick(resource.id.toString(), resourceGroup.id.toString(), start)
                          }
                        }}
                      />
                    );
                  })}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
    )
}

export default ResourceCalendarBody;