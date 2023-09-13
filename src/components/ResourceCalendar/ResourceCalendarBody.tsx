import React from 'react';
import { Resource, ResourceGroup } from './types';
import { weekendHightlight } from '../../settings';

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
            <>
              <tr className="resource-class-section-header">
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
                          backgroundColor: isWeekend ? weekendHightlight : "none",
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
    )
}

export default ResourceCalendarBody;