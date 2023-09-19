import React, { Fragment } from 'react';
import { Resource, ResourceGroup } from './types';
import { WEEKENDHIGHLIGHT } from '../../settings';
import { isWeekend } from '../../utils/helpers';
import { Typography } from '@mui/material';

type ResourceCalendarBodyComponentProps = {
    /** mandatory, resources array */
    resources: ResourceGroup[],
    /** mandatory, date array */
    dateArray: Date[]
}

const ResourceCalendarBody = ({resources, dateArray}: ResourceCalendarBodyComponentProps) => {
    return (
        <tbody
          id="resource-calendar-table-body"
          className="resource-calendar-table-body"
        >
          {resources.map((resourceGroup) => (
            <Fragment key={resourceGroup.class}>
              <tr className="resource-class-section-header">
                <Typography variant="subtitle2" component="td" colSpan={10000}>{resourceGroup.class}</Typography>
              </tr>
              {resourceGroup.resources.map((resource) => (
                <tr key={resource.id.toString()}>
                  <Typography variant="body2" component="td">{resource.name}</Typography>
                  {dateArray.map((date) => {
                    return (
                      <td
                        key={date.toString()}
                        style={{
                          backgroundColor: isWeekend(date) ? WEEKENDHIGHLIGHT : "none",
                        }}
                        className="cell"
                        data-unit={resource.id}
                        data-midpoint={date}
                        data-start={new Date(new Date(date).setHours(12))}
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