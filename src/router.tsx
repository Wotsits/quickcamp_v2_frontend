import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./components/ErrorPage";
import BookingCalendar from "./routes/booking-calendar";
import Guests from "./routes/guests";
import Bookings from "./routes/bookings";
import Admin from "./routes/admin";
import CentreFullPage from "./components/CentreFullPage";
import LoginForm from "./components/LoginForm";
import ProtectedRouteWrapper from "./components/ProtectedRouteWrapper";
import Dashboard from "./routes/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouteWrapper>
        <Root />
      </ProtectedRouteWrapper>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard/",
        element: <Dashboard />,
      },
      {
        path: "booking-calendar/",
        element: <BookingCalendar />,
      },
      {
        path: "guests/",
        element: <Guests />,
      },
      {
        path: "bookings/",
        element: <Bookings />,
      },
      {
        path: "admin/",
        element: <Admin />,
      },
    ],
  },
  {
    path: "login/",
    element: (
      <CentreFullPage>
        <LoginForm />
      </CentreFullPage>
    ),
    errorElement: <ErrorPage />,
  },
]);
