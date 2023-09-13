import React from "react";
import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div id="sidebar">
        <h1>Ark Booking Management</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search bookings"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`/dashboard/`}>Dashboard</Link>
            </li>
            <li>
              <Link to={`/booking-calendar/`}>Booking Calendar</Link>
            </li>
            <li>
              <Link to={`/guests/`}>Guests</Link>
            </li>
            <li>
              <Link to={`/bookings/`}>Bookings</Link>
            </li>
            <li>
              <Link to={`/admin/`}>Administration</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
