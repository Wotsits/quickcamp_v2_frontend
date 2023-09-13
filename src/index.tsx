import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Root from "./routes/root";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./routes/dashboard";
import BookingCalendar from "./routes/booking-calendar";
import Guests from "./routes/guests";
import Bookings from "./routes/bookings";
import Admin from "./routes/admin";

const router = createBrowserRouter([
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
    ]
  },
]);

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
