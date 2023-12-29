import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./routes";
import ErrorPage from "./components/organisms/ErrorPage";
import BookingCalendar from "./routes/bookings/calendar";
import Guests from "./routes/guests/all";
import Bookings from "./routes/bookings/all";
import Admin from "./routes/admin";
import CentreFullPage from "./components/atoms/CentreFullPage";
import LoginForm from "./components/organisms/LoginForm";
import ProtectedRouteWrapper from "./components/atoms/ProtectedRouteWrapper";
import Dashboard from "./routes/dashboard";
import Arrivals from "./routes/arrivals/all";
import IndividualBooking from "./routes/bookings/[id]";
import { ROUTES } from "./settings";
import NewBooking from "./routes/bookings/new";
import IndividualArrival from "./routes/arrivals/[id]";
import Experimental from "./Experimental";
import SitesAdmin from "./routes/admin/sites";
import UsersAdmin from "./routes/admin/users";
import Departures from "./routes/departures/all";
import IndividualDeparture from "./routes/departures/[id]";
import IndividualGuest from "./routes/guests/[id]";
import NewSiteForm from "./routes/admin/sites/new";
import IndividualSite from "./routes/admin/sites/[id]";
import RatesPage from "./routes/admin/sites/[id]/ratesPage";

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
            index: true,
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
            index: true,
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
            index: true,
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
            index: true,
            element: <Bookings />,
          },
          {
            path: ROUTES.CALENDAR,
            element: <BookingCalendar />,
          },
          {
            path: ROUTES.NEW,
            element: <NewBooking />,
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
            index: true,
            element: <Admin />,
          },
          {
            path: ROUTES.SITES,
            children: [
              {
                index: true,
                element: <SitesAdmin />,
              },
              {
                path: ROUTES.NEW,
                element: <NewSiteForm />,
              },
              {
                path: ROUTES.ID,
                children: [
                  { 
                    index: true,
                    element: <IndividualSite />
                  },
                  {
                    path: ROUTES.RATES,
                    element: <RatesPage />
                  }
                ]
              }
            ],
          },
          {
            path: ROUTES.USERS,
            children: [
              {
                index: true,
                element: <UsersAdmin />,
              },
              {
                path: ROUTES.ID,
                element: <div>User</div>
              }
            ]
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
