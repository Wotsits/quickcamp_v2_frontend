import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getBookings } from "../../../services/queries/getBookings";
import { Booking, BookingSumm, GuestType } from "../../../types";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AuthContext from "../../../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_PAGE_SIZE, ROUTES } from "../../../settings";
import PageHeader from "../../../components/molecules/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getGuestTypes } from "../../../services/queries/getGuestTypes";
import TablePaginationControls from "../../../components/atoms/Table/TablePaginationControls";
import SiteContext from "../../../contexts/sitesContext";
import Tick from "../../../components/atoms/Icons/Tick"
import Question from "../../../components/atoms/Icons/Question"
import Cross from "../../../components/atoms/Icons/Cross"

function getBookingStatusIcon(status: string): ReactNode {
  switch(status) {
    case "CONFIRMED": return <Tick/>
    case "UNCONFIRMED": return <Question/>
    case "CANCELLED": return <Cross/>
  }
}

const Bookings = () => {
  // -----------
  // CONTEXT
  // -----------

  const { user } = useContext(AuthContext);
  const { selectedSite } = useContext(SiteContext);

  // -----------
  // HOOKS
  // -----------

  const navigate = useNavigate();
  const location = useLocation();

  // -------------
  // STATE
  // -------------

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(1);

  // -----------
  // QUERIES
  // -----------

  const {
    isLoading: bookingsAreLoading,
    isError: bookingsAreError,
    data: bookingsData,
    error: bookingsError,
  } = useQuery<{ data: BookingSumm[] | Booking[], count: number | undefined }, Error>(["bookings", {
    token: user.token,
    siteId: selectedSite!.id,
    skip: page * pageSize - pageSize,
    take: pageSize,
    include: {
      unit: true,
      leadGuest: true,
      guests: true,
    },
    orderBy: { id: "desc" },
    status: location.search === "?unconfirmed=true" ? "UNCONFIRMED" : undefined,
    count: true
  }], () =>
    getBookings({
      token: user.token,
      siteId: selectedSite!.id,
      skip: page * pageSize - pageSize,
      take: pageSize,
      include: {
        unit: true,
        leadGuest: true,
        guests: true,
      },
      orderBy: { id: "desc" },
      status: location.search === "?unconfirmed=true" ? "UNCONFIRMED" : undefined,
      count: true
    })
  );

  const {
    isLoading: guestTypesAreLoading,
    isError: guestTypesAreError,
    data: guestTypesData,
    error: guestTypesError,
  } = useQuery<{ data: GuestType[] }, Error>(["guestTypes"], () =>
    getGuestTypes({ token: user.token, siteId: selectedSite!.id })
  );

  // -----------
  // RENDER
  // -----------

  if (bookingsAreLoading || guestTypesAreLoading) {
    return <div>Loading...</div>;
  }

  if (bookingsAreError || guestTypesAreError) {
    return (
      <>
        {bookingsError && <div>Error: {bookingsError.message}</div>}
        {guestTypesError && <div>Error: {guestTypesError.message}</div>}
      </>
    );
  }


  return (
    <div id="bookings" className="full-width h-full flex-column">

      {/* PAGE HEADER */}

      <PageHeader title={location.search === "?unconfirmed=true" ? "Unconfirmed Bookings" : "Bookings"}>
        <IconButton
          onClick={() => navigate(ROUTES.ROOT + ROUTES.BOOKINGS + ROUTES.NEW)}
          size="large"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

      {/* TABLE */}

      <div className="container-white-bg-rounded-full-width flex-grow overflow-y-auto">
        <TableContainer sx={{ minWidth: "600px", overflowX: "initial" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Lead Guest Name</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Fee</TableCell>
                {guestTypesData?.data.map(guestType => {
                  return (
                    <TableCell key={guestType.id}>
                      {guestType.name}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {(bookingsData?.data as Booking[]).map(booking => {
                return (
                  <TableRow
                    key={booking.id}
                    className="clickable"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() =>
                      navigate(
                        ROUTES.ROOT + ROUTES.BOOKINGS + booking.id
                      )
                    }
                    hover
                  >
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{getBookingStatusIcon(booking.status)}</TableCell>
                    <TableCell>{booking.leadGuest.firstName + " " + booking.leadGuest.lastName}</TableCell>
                    <TableCell>{booking.unit.name}</TableCell>
                    <TableCell>{new Date(booking.start).toDateString() + ", " + new Date(booking.start).toLocaleTimeString()}</TableCell>
                    <TableCell>{new Date(booking.end).toDateString() + ", " + new Date(booking.end).toLocaleTimeString()}</TableCell>
                    <TableCell>{"£" + booking.totalFee}</TableCell>
                    {guestTypesData?.data.map(guestType => {
                      return (
                        <TableCell key={guestType.id}>
                          {booking.guests!.filter(
                            guest => guest.guestTypeId === guestType.id
                          )?.length}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePaginationControls
          count={bookingsData?.count || 0}
          page={page}
          rowsPerPage={pageSize}
          onPageChange={(_, page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Bookings;
