import React, { useContext, useState } from "react";
import ResourceCalendar from "../../../components/ResourceCalendar";
import { Alert, Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ColumnWidthControls from "../../../components/ResourceCalendar/ColumnWidthControls";
import "../../style.css";
import { useQuery } from "react-query";
import { BookingSumm, Unit, UnitType } from "../../../types";
import { getBookingsByDateRange } from "../../../services/queries/getBookingsByDateRange";
import {
  addOneMonth,
  setDateToMidday,
  today1200,
} from "../../../utils/dateTimeManipulation";
import AuthContext from "../../../contexts/authContext";
import { ResourceGroup } from "../../../components/ResourceCalendar/types";
import { getUnitTypes } from "../../../services/queries/getUnitTypes";
import { BOOKINGCALENDARCOLUMNWIDTHMIN, ROUTES } from "../../../settings";
import { useNavigate } from "react-router-dom";

// -------------
// MAIN
// -------------

const BookingCalendar = () => {
  // -------------
  // STATE
  // -------------

  const { user, selectedSite } = useContext(AuthContext);
  const [startDate, setStartDate] = useState<Date | null>(today1200());
  const [columnWidth, setColumnWidth] = useState<number>(100);

  // -------------
  // HOOKS
  // -------------

  const navigate = useNavigate();

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading: bookingsAreLoading,
    isError: bookingsAreError,
    data: bookingsData,
    error: bookingsError,
  } = useQuery<BookingSumm[], Error>(
    ["BookingsByDateRange", startDate, addOneMonth(startDate as Date)],
    () =>
      getBookingsByDateRange({
        start: startDate as Date,
        end: addOneMonth(startDate as Date),
        token: user.token,
        siteId: selectedSite!.id,
      })
  );

  const {
    isLoading: unitTypesAreLoading,
    isError: unitTypesAreError,
    data: unitTypesData,
    error: unitTypesError,
  } = useQuery<UnitType[], Error>(["UnitTypes", selectedSite!.id], () =>
    getUnitTypes({ token: user.token, siteId: selectedSite!.id })
  );

  // -------------
  // EVENT HANDLERS
  // -------------

  function handleCallbackOnCellClick(
    resourceId: string,
    resourceTypeId: string,
    start: Date
  ) {
    navigate(
      ROUTES.ROOT +
        ROUTES.BOOKINGS +
        ROUTES.NEW +
        "?unitId=" +
        resourceId +
        "&unitTypeId=" +
        resourceTypeId +
        "&start=" +
        start.toISOString()
    );
  }

  // -------------
  // RENDER
  // -------------

  if (bookingsAreLoading || unitTypesAreLoading || bookingsData === undefined) {
    return <div>Loading...</div>;
  }

  if (unitTypesAreError) {
    return <Alert severity="error">Error: {unitTypesError.message}</Alert>;
  }

  if (bookingsAreError) {
    return <Alert severity="error">Error: {bookingsError.message}</Alert>;
  }

  const resources: ResourceGroup[] = unitTypesData
    ? unitTypesData.map((unitType) => {
        const units = unitType.units!.map((unit: Unit) => ({
          id: unit.id,
          name: unit.name,
          unitTypeId: unit.unitTypeId,
          unitType: unitType.name,
        }));
        return {
          id: unitType.id,
          resourceTypeName: unitType.name,
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
        id="booking-calendar-datepicker"
        className="booking-calendar-datepicker"
      >
        <DatePicker
          onChange={(value: Date | null) =>
            setStartDate(setDateToMidday(value as Date))
          }
          label={"Calendar start date"}
        />
        <ColumnWidthControls
          columnWidth={columnWidth}
          setColumnWidth={setColumnWidth}
          minWidth={BOOKINGCALENDARCOLUMNWIDTHMIN}
        />
      </Box>
      <div id="booking-calendar-container">
        <ResourceCalendar
          resources={resources}
          bookings={bookingsData}
          startDate={startDate as Date}
          columnWidth={columnWidth}
          onCellClick={handleCallbackOnCellClick}
        />
      </div>
    </div>
  );
};

export default BookingCalendar;
