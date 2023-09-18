import React, { useContext, useState } from "react";
import ResourceCalendar from "../components/ResourceCalendar";
import { Alert, Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import ColumnWidthControls from "../components/ResourceCalendar/ColumnWidthControls";
import "./style.css";
import { useQuery } from "react-query";
import { Booking, Unit } from "../types";
import { getBookingsByDateRange } from "../services/queries/getBookingsByDateRange";
import { addOneMonth, today1200 } from "../utils/dateTimeManipulation";
import AuthContext from "../contexts/authContext";
import { getUnits } from "../services/queries/getUnits";
import { ResourceGroup } from "../components/ResourceCalendar/types";

// -------------
// MAIN
// -------------

const BookingCalendar = () => {
  const {user} = useContext(AuthContext)
  // -------------
  // STATE
  // -------------

  const [startDate, setStartDate] = useState<Date | null>(today1200());
  const [columnWidth, setColumnWidth] = useState<number>(100);

  const { isLoading: bookingsAreLoading, isError: bookingsAreError, data: bookingsData, error: bookingsError } = useQuery<Booking[], Error>([
    "Bookings",
    startDate,
    addOneMonth(startDate as Date)
  ],
    () =>
      getBookingsByDateRange({
        start: startDate as Date,
        end: addOneMonth(startDate as Date),
        token: user.token
      }),
  );

  const { isLoading: unitsAreLoading, isError: unitsAreError, data: unitsData, error: unitsError } = useQuery<Unit[], Error>(["Units"], () => getUnits({ token: user.token }));

  // -------------
  // RENDER
  // -------------

  if (bookingsAreLoading || unitsAreLoading) {
    return <div>Loading...</div>;
  }

  if (unitsAreError) {
    return <Alert severity="error">Error: {unitsError.message}</Alert>;
  }

  if (bookingsAreError) {
    return <Alert severity="error">Error: {bookingsError.message}</Alert>;
  }

  const bookingSummaries = bookingsData ? bookingsData.map((booking) => ({
    id: booking.id,
    bookingName: "Smith", // TODO fix this
    adults: 2, // TODO fix this
    children: 2, // TODO fix this
    infants: 0, // TODO fix this
    pets: 1, // TODO fix this
    vehicles: 2, // TODO fix this
    unit: booking.unitId,
    start: booking.start.toString(),
    end: booking.end.toString(),
    paid: true, // TODO fix this
    peopleCheckedIn: 2, // TODO fix this
    petsCheckedIn: 1, // TODO fix this
    vehiclesCheckedIn: 1, // TODO fix this
  })) : [];


  const resources: ResourceGroup[] = unitsData
  ? unitsData.reduce<ResourceGroup[]>((result, unit) => {
      // Create a new class object and add the unit
      result.push({
        class: unit.unitTypeId.toString(),
        resources: [{ id: unit.id, name: unit.name }],
      });

      return result;
    }, [])
  : [];


  return (
    <div id="booking-calendar" className="route-container">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Booking Calendar
      </Typography>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="booking-calendar-datepicker"
        className="booking-calendar-datepicker"
      >
        <DatePicker
          onChange={(value: Date | null) => setStartDate(value)}
          label={"Calendar start date"}
        />
        <ColumnWidthControls
          columnWidth={columnWidth}
          setColumnWidth={setColumnWidth}
        />
      </Box>
      <ResourceCalendar
        resources={resources}
        bookings={bookingSummaries}
        startDate={startDate as Date}
        columnWidth={columnWidth}
      />
    </div>
  );
};

export default BookingCalendar;
