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
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { DRAWERWIDTH, PRIMARYCOLOR, SECONDARYCOLOR } from "../settings";
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
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Booking Calendar",
    path: "/booking-calendar",
    icon: <CalendarTodayIcon />,
  },
  {
    text: "Booking List",
    path: "/bookings",
    icon: <ListIcon />,
  },
  {
    text: "Guest List",
    path: "/guests",
    icon: <PeopleIcon />,
  },
];

const secondaryNavOptions = [
  {
    text: "Admin",
    path: "/admin",
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
    return <Navigate to="/dashboard" />;
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <SearchField callback={(a) => console.log(a)}/>
            <IconButton
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
            </IconButton>
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
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, height: '100vh', overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
