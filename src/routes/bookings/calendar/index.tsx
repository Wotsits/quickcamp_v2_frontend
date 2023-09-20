import React, { useContext, useState } from "react";
import ResourceCalendar from "../../../components/ResourceCalendar";
import { Alert, Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ColumnWidthControls from "../../../components/ResourceCalendar/ColumnWidthControls";
import "../../style.css";
import { useQuery } from "react-query";
import { Booking, Unit, UnitType } from "../../../types";
import { getBookingsByDateRange } from "../../../services/queries/getBookingsByDateRange";
import { addOneMonth, setDateToMidday, today1200 } from "../../../utils/dateTimeManipulation";
import AuthContext from "../../../contexts/authContext";
import { ResourceGroup } from "../../../components/ResourceCalendar/types";
import { getUnitTypes } from "../../../services/queries/getUnitTypes";
import { BOOKINGCALENDARCOLUMNWIDTHMIN } from "../../../settings";

// -------------
// MAIN
// -------------

const BookingCalendar = () => {
  // -------------
  // STATE
  // -------------

  const {user, selectedSite} = useContext(AuthContext)
  const [startDate, setStartDate] = useState<Date | null>(today1200());
  const [columnWidth, setColumnWidth] = useState<number>(100);

  const { isLoading: bookingsAreLoading, isError: bookingsAreError, data: bookingsData, error: bookingsError } = useQuery<Booking[], Error>([
    "BookingsByDateRange",
    startDate,
    addOneMonth(startDate as Date)
  ],
    () =>
      getBookingsByDateRange({
        start: startDate as Date,
        end: addOneMonth(startDate as Date),
        token: user.token,
        siteId: selectedSite!.id,
      }),
  );

  const { isLoading: unitTypesAreLoading, isError: unitTypesAreError, data: unitTypesData, error: unitTypesError } = useQuery<UnitType[], Error>(["UnitTypes", selectedSite!.id], () => getUnitTypes({ token: user.token, siteId: selectedSite!.id }));

  // -------------
  // RENDER
  // -------------

  if (bookingsAreLoading || unitTypesAreLoading) {
    return <div>Loading...</div>;
  }

  if (unitTypesAreError) {
    return <Alert severity="error">Error: {unitTypesError.message}</Alert>;
  }

  if (bookingsAreError) {
    return <Alert severity="error">Error: {bookingsError.message}</Alert>;
  }

  const bookingPaymentsTotal = (payments: { amount: number }[]) => {
    // total the payments
    let total = 0;
    payments.forEach((payment) => {
      total += payment.amount;
    });
    return total;
  }

  const bookingSummaries = bookingsData ? bookingsData.map((booking) => ({
    id: booking.id,
    bookingName: booking.leadGuest.lastName, 
    adults: booking.guests!.filter(guest => guest.age >= 18).length, 
    children: booking.guests!?.filter(guest => guest.age < 18 && guest.age >= 5).length,
    infants: booking.guests!.filter(guest => guest.age < 5).length,
    pets: booking.pets!.length,
    vehicles: booking.vehicles!.length,
    unit: booking.unitId,
    start: booking.start.toString(),
    end: booking.end.toString(),
    paid: bookingPaymentsTotal(booking.payments!) >= booking.totalFee,
    peopleCheckedIn: booking.guests!.filter(guest => guest.checkedIn).length, 
    petsCheckedIn: booking.pets!.filter(pet => pet.checkedIn).length,
    vehiclesCheckedIn: booking.vehicles!.filter(vehicle => vehicle.checkedIn).length,
  })) : [];

  const resources: ResourceGroup[] = unitTypesData
  ? unitTypesData.map(unitType => {
    const units = unitType.units!.map((unit: Unit) => ({
      id: unit.id,
      name: unit.name,
      unitTypeId: unit.unitTypeId,
      unitType: unitType.name,
    }));
    return {
      class: unitType.name,
      resources: units,
    };
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
          onChange={(value: Date | null) => setStartDate(setDateToMidday(value as Date))}
          label={"Calendar start date"}
        />
        <ColumnWidthControls
          columnWidth={columnWidth}
          setColumnWidth={setColumnWidth}
          minWidth={BOOKINGCALENDARCOLUMNWIDTHMIN}
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
