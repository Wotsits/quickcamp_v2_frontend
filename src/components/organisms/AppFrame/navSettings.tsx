import React from 'react'
import { ROUTES } from "../../../settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ListIcon from "@mui/icons-material/List";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeOffIcon from "@mui/icons-material/FlightTakeOff";

export const primaryNavOptions = [
    {
      text: "Dashboard",
      path: ROUTES.DASHBOARD,
      icon: <DashboardIcon />,
    },
    {
      text: "Booking Calendar",
      path: ROUTES.BOOKINGS + ROUTES.CALENDAR,
      icon: <CalendarTodayIcon />,
    },
    {
      text: "Arrivals",
      path: ROUTES.ARRIVALS,
      icon: <FlightLandIcon />,
    },
    {
      text: "Departures",
      path: ROUTES.DEPARTURES,
      icon: <FlightTakeOffIcon />,
    },
    {
      text: "Booking List",
      path: ROUTES.BOOKINGS,
      icon: <ListIcon />,
    },
    {
      text: "Guest List",
      path: ROUTES.GUESTS,
      icon: <PeopleIcon />,
    },
  ];
  
  export const secondaryNavOptions = [
    {
      text: "Admin",
      path: ROUTES.ADMIN,
      icon: <SettingsIcon />,
    },
  ];