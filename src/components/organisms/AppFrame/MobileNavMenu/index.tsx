import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useState } from 'react'
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

type MobileNavProps = {
    /** Mandatory, the primary navigation options */
    primaryNavOptions: { path: string; text: string; icon: any }[];
  };

const MobileNav = ({primaryNavOptions}: MobileNavProps) => {
    // -----------
    // HOOKS
    // -----------

    const navigate = useNavigate()

    // -----------
    // STATE
    // -----------

    const [value, setValue] = useState(0);

    return (
        <div id="app-bottom-menu">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                {primaryNavOptions.map(option => (
                    <BottomNavigationAction label={option.text} icon={option.icon} onClick={() => navigate(option.path)} />
                ))}
                
            </BottomNavigation>
        </div>
    )

}

export default MobileNav;