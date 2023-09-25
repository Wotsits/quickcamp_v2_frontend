import React, { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ListIcon from "@mui/icons-material/List";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { DRAWERWIDTH, PRIMARYCOLOR, ROUTES, SECONDARYCOLOR } from "../settings";
import NavDrawer from "../components/NavDrawer";
import { Avatar, Badge, InputBase, alpha } from "@mui/material";
import SearchField from "../components/SearchField";
import AuthContext from "../contexts/authContext";
import { getInitials } from "../utils/helpers";
import SiteSelector from "../components/SiteSelector";

// -------------
// SUBCOMPONENTS
// -------------

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWERWIDTH,
    width: `calc(100% - ${DRAWERWIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// -------------
// SETTINGS
// -------------

const primaryNavOptions = [
  {
    text: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    text: "Booking Calendar",
    path: ROUTES.BOOKINGS+ROUTES.CALENDAR,
    icon: <CalendarTodayIcon />,
  },
  {
    text: "Arrivals",
    path: ROUTES.ARRIVALS,
    icon: <FlightLandIcon />,
  },
  {
    text: "Booking List",
    path: ROUTES.BOOKINGS+ROUTES.ALL,
    icon: <ListIcon />,
  },
  {
    text: "Guest List",
    path: ROUTES.GUESTS,
    icon: <PeopleIcon />,
  },
];

const secondaryNavOptions = [
  {
    text: "Admin",
    path: ROUTES.ADMIN,
    icon: <SettingsIcon />,
  },
];

// -------------
// COMPONENT
// -------------

const Root = () => {
  
  // -----------
  // STATE
  // -----------

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const {user, selectedSite, setSelectedSite} = useContext(AuthContext)

  // -----------
  // HANDLERS
  // -----------

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  // -----------
  // RENDER
  // -----------

  if (location.pathname === "/") {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }
  
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        style={{
          background: `linear-gradient(to right, ${PRIMARYCOLOR}, ${SECONDARYCOLOR})`,
        }}
      >
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
            Ark Booking Management
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex"}}>
            <Box sx={{ display: {xs: "none", md: "block"}}}><SearchField callback={(a) => console.log(a)}/></Box>
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <Avatar sx={{ ml: 2, bgcolor: SECONDARYCOLOR, border: "1px solid white"}}>{user && getInitials(user.name)}</Avatar>
            <SiteSelector selectedSite={selectedSite} setSelectedSite={setSelectedSite} sites={user?.sites || []}/>
          </Box>
        </Toolbar>
      </AppBar>
      <NavDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        primaryNavOptions={primaryNavOptions}
        secondaryNavOptions={secondaryNavOptions}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, height: '100vh', overflow: "auto", boxSizing: "border-box" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
