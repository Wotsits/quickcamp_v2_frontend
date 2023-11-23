import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./routes";
import ErrorPage from "./components/ErrorPage";
import BookingCalendar from "./routes/bookings/calendar";
import Guests from "./routes/guests";
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
          }
        ]
      },
      {
        path: ROUTES.GUESTS,
        element: <Guests />,
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
          }
        ]
      },
      {
        path: ROUTES.ADMIN,
        element: <Admin />,
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
  }
]);
