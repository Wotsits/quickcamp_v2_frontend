import { Paper, Typography } from '@mui/material';
import React from 'react';
import { occupantTypeIconMap } from '../../settings';
import './style.css';

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
                <div className="occupant-card-icon-container"> 
                    {occupantTypeIconMap[type]({className: "occupant-card-icon-svg"})}
                </div>
                <div className="occupant-card-detail-container">
                    <Typography variant="h4" component="h5">{name}</Typography>
                    <Typography variant="h5" component="h6">Arrives: {start.toDateString()}</Typography>
                    <Typography variant="h5" component="h6">Departs: {end.toDateString()}</Typography>
                </div>
                <div className="occupant-card-status-container">
                    <Typography variant="h5" component="h4" color={checkedIn ? "green" : "red"}>{checkedIn ? "Checked In" : "Not Checked In"}</Typography>
                </div>
        </div>
    );
};

export default OccupantCard;
