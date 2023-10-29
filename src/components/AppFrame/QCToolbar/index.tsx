import React from 'react';
import { Toolbar, Typography, IconButton, Box, Avatar } from '@mui/material';
import { APPLICATIONNAME, SECONDARYCOLOR } from '../../../settings';
import SearchField from '../../SearchField';
import SiteSelector from '../../SiteSelector';
import { getInitials } from '../../../utils/helpers';
import MenuIcon from "@mui/icons-material/Menu";
import { Site } from '../../../types';

type QCToolbarProps = {
    handleDrawerOpen: () => void;
    user: any;
    open: boolean;
    selectedSite: Site | null;
    setSelectedSite: (a: number) => void;
    }

const QCToolbar = ({ handleDrawerOpen, user, open, selectedSite, setSelectedSite}: QCToolbarProps) => {
    return (
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {APPLICATIONNAME}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <SearchField callback={(a) => console.log(a)} trigger="ENTER" />
            </Box>
            <Avatar
              sx={{ ml: 2, bgcolor: SECONDARYCOLOR, border: "1px solid white" }}
            >
              {user && getInitials(user.name)}
            </Avatar>
            <SiteSelector
              selectedSite={selectedSite}
              setSelectedSite={setSelectedSite}
              sites={user?.sites || []}
            />
          </Box>
        </Toolbar>
    )
}

export default QCToolbar;