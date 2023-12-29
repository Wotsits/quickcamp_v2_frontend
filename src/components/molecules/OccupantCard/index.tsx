import { Paper, Typography } from '@mui/material';
import React from 'react';
import { occupantTypeIconMap } from '../../../settings';
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
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography variant="subtitle2">Arrives: {start.toDateString()}</Typography>
                    <Typography variant="subtitle2">Departs: {end.toDateString()}</Typography>
                </div>
                <div className="occupant-card-status-container">
                    <Typography variant="subtitle1" color={checkedIn ? "green" : "red"}>{checkedIn ? "Checked In" : "Not Checked In"}</Typography>
                </div>
        </div>
    );
};

export default OccupantCard;
