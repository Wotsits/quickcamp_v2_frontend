import React, { useContext, useState } from "react";
import ResourceCalendar from "../../../components/organisms/ResourceCalendar";
import { Alert, Box, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ColumnWidthControls from "../../../components/organisms/ResourceCalendar/ColumnWidthControls";
import { useQuery } from "react-query";
import { Booking, BookingSumm, Unit, UnitType } from "../../../types";
import {
  addOneMonth,
  setDateToMidday,
  today1200,
} from "../../../utils/dateTimeManipulation";
import AuthContext from "../../../contexts/authContext";
import { ResourceGroup } from "../../../components/organisms/ResourceCalendar/types";
import { getUnitTypes } from "../../../services/queries/getUnitTypes";
import { BOOKINGCALENDARCOLUMNWIDTHMIN, BOOKING_STATUSES, ROUTES, WIDTH_OF_BOOKING_CALENDAR } from "../../../settings";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/molecules/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SiteContext from "../../../contexts/sitesContext";
import { getBookings } from "../../../services/queries/getBookings";

// -------------
// MAIN
// -------------

const BookingCalendar = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);
  const { selectedSite } = useContext(SiteContext);

  // -------------
  // STATE
  // -------------

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
  } = useQuery<{ data: BookingSumm[] | Booking[], count: number | undefined }, Error>(
    ["bookings", selectedSite!.id, startDate, addOneMonth(startDate as Date)],
    () =>
      getBookings({
        siteId: selectedSite!.id,
        token: user.token,
        status: BOOKING_STATUSES.CONFIRMED,
        OR: [
          {
            start: {
              gte: startDate?.toISOString(),
              lt: addOneMonth(startDate as Date).toISOString(),
            },
          },
          {
            end: {
              gte: startDate?.toISOString(),
              lt: addOneMonth(startDate as Date).toISOString(),
            },
          },
          {
            AND: [
              {
                start: {
                  lte: startDate?.toISOString(),
                },
                end: {
                  gt: addOneMonth(startDate as Date).toISOString(),
                },
              },
            ],
          },
        ],
        include: {
          unit: true,
          leadGuest: true,
          guests: {
            select: {
              checkedIn: true,
              guestType: {
                include: {
                  guestTypeGroup: true,
                },
              },
            },
          },
          bookingGroup: {
            include: {
              bookings: true
            }
          },
          payments: true,
        },
        summariesOnly: true,
      })
  );

  const {
    isLoading: unitTypesAreLoading,
    isError: unitTypesAreError,
    data: unitTypesData,
    error: unitTypesError,
  } = useQuery<{ data: UnitType[] }, Error>(["UnitTypes", selectedSite!.id], () =>
    getUnitTypes({
      token: user.token,
      siteId: selectedSite!.id,
      includeUnits: true,
    })
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
    ? unitTypesData.data.map((unitType) => {
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
    <div id="booking-calendar" className="full-width">

      <PageHeader title="Booking Calendar">
        <IconButton onClick={() => navigate(`/${ROUTES.BOOKINGS + ROUTES.NEW}`)} size="large">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

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
          bookings={bookingsData.data as BookingSumm[]}
          startDate={startDate as Date}
          columnWidth={columnWidth}
          onCellClick={handleCallbackOnCellClick}
        />
      </div>
    </div>
  );
};

export default BookingCalendar;
