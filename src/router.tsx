import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./components/ErrorPage";
import { Dashboard } from "@mui/icons-material";
import BookingCalendar from "./routes/booking-calendar";
import Guests from "./routes/guests";
import Bookings from "./routes/bookings";
import Admin from "./routes/admin";
import CentreFullPage from "./components/CentreFullPage";
import LoginForm from "./components/LoginForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
