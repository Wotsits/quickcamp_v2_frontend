import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./routes";
import ErrorPage from "./components/ErrorPage";
import BookingCalendar from "./routes/bookings/calendar";
import Guests from "./routes/guests/all";
import Bookings from "./routes/bookings/all";
import Admin from "./routes/admin";
import CentreFullPage from "./components/CentreFullPage";
import LoginForm from "./components/LoginForm";
import ProtectedRouteWrapper from "./components/ProtectedRouteWrapper";
import Dashboard from "./routes/dashboard";
import Arrivals from "./routes/arrivals/all";
import IndividualBooking from "./routes/bookings/[id]";
import { ROUTES } from "./settings";
import NewBooking from "./routes/bookings/new";
import IndividualArrival from "./routes/arrivals/[id]";
import Experimental from "./Experimental";
import SitesAdmin from "./routes/admin/sites";
import UnitTypesAdmin from "./routes/admin/unitTypes";
import UnitsAdmin from "./routes/admin/units";
import GuestTypesAdmin from "./routes/admin/guestTypes";
import EquipmentTypesAdmin from "./routes/admin/equipmentTypes";
import ExtraTypesAdmin from "./routes/admin/extraTypes";
import UsersAdmin from "./routes/admin/users";
import SiteForm from "./routes/admin/sites/new";
import Departures from "./routes/departures/all";
import IndividualDeparture from "./routes/departures/[id]";
import IndividualGuest from "./routes/guests/[id]";
import NewSiteForm from "./routes/admin/sites/new";
import IndividualSite from "./routes/admin/sites/[id]";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: (
      <ProtectedRouteWrapper>
        <Root />
      </ProtectedRouteWrapper>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.ARRIVALS,
        children: [
          {
            path: ROUTES.ALL,
            element: <Arrivals />,
          },
          {
            path: ROUTES.ID,
            element: <IndividualArrival />,
          },
        ],
      },
      {
        path: ROUTES.DEPARTURES,
        children: [
          {
            path: ROUTES.ALL,
            element: <Departures />,
          },
          {
            path: ROUTES.ID,
            element: <IndividualDeparture />,
          },
        ],
      },
      {
        path: ROUTES.GUESTS,
        children: [
          {
            path: ROUTES.ALL,
            element: <Guests />,
          },
          {
            path: ROUTES.ID,
            element: <IndividualGuest />,
          },
        ],
      },
      {
        path: ROUTES.BOOKINGS,
        children: [
          {
            path: ROUTES.CALENDAR,
            element: <BookingCalendar />,
          },
          {
            path: ROUTES.NEW,
            element: <NewBooking />,
          },
          {
            path: ROUTES.ALL,
            element: <Bookings />,
          },
          {
            path: ROUTES.ID,
            element: <IndividualBooking />,
          },
        ],
      },
      {
        path: ROUTES.ADMIN,
        children: [
          {
            path: ROUTES.SITES,
            children: [
              {
                path: ROUTES.NEW,
                element: <NewSiteForm />,
              },
              {
                path: ROUTES.ALL,
                element: <SitesAdmin />,
              },
              {
                path: ROUTES.ID,
                element: <IndividualSite />,
              }
            ],
          },
          {
            path: ROUTES.USERS,
            element: <UsersAdmin />,
          },
          {
            path: ROUTES.MENU,
            element: <Admin />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <CentreFullPage>
        <LoginForm />
      </CentreFullPage>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES.EXPERIMENTAL,
    element: <Experimental />,
  },
]);
