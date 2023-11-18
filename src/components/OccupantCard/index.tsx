import { Paper, Typography } from '@mui/material';
import React from 'react';
import { getOccupantTypeIcon } from '../../settings';

type OccupantCardProps = {
    name: string;
    type: string;
    start: Date;
    end: Date;
    checkedIn: boolean;
}

const OccupantCard = ({name, type, start, end, checkedIn}: OccupantCardProps) => {
    return (
        <div className="occupant-card">
            <Paper elevation={5}>
                <div className="occupant-card-icon"> 
                    {getOccupantTypeIcon(type)}
                </div>
                <div className="occupant-card-detail">
                    <Typography variant="h4" component="h3">{name}</Typography>
                    <Typography variant="h5" component="h4">Arrives: {start.toDateString()}</Typography>
                    <Typography variant="h5" component="h4">Departs: {end.toDateString()}</Typography>
                </div>
                <div className="occupant-card-status">
                    <Typography variant="h5" component="h4">{checkedIn ? "Checked In" : "Not Checked In"}</Typography>
                </div>
            </Paper>
        </div>
    );
};

export default OccupantCard;
