import { Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Booking, BookingGuest, BookingSumm } from "../../types";
import AuthContext from "../../contexts/authContext";
import ArrivalsGraph from "../../components/organisms/ArrivalsGraph";
import "./style.css";
import { BOOKING_STATUSES, PRIMARYCOLOR, ROUTES, SECONDARYCOLOR } from "../../settings";
import { useNavigate } from "react-router-dom";
import SummaryBlock from "../../components/molecules/SummaryBlock";
import { today1200 } from "../../utils/dateTimeManipulation";
import { isSameDate } from "../../utils/helpers";
import { getTotalOnSiteNow } from "../../services/queries/getTotalOnSiteNow";
import { BarChart } from "@mui/x-charts";
import SiteContext from "../../contexts/sitesContext";
import CustomTabPanel from "../../components/molecules/CustomTabPanel"
import { getTotalOnSiteTonight } from "../../services/queries/getTotalOnSiteTonight";
import { getTotalPaymentsToday } from "../../services/queries/getTotalPaymentsToday";
import { getPaymentsBreakdownToday } from "../../services/queries/getPaymentsBreakdownToday";
import { getUnconfirmedBookingsCount } from "../../services/queries/getUnconfirmedBookingsCount";
import { getBookings } from "../../services/queries/getBookings";

const now = today1200();

const Dashboard = () => {
  // -------------
  // CONTEXTS
  // -------------

  const { user } = useContext(AuthContext);
  const { selectedSite } = useContext(SiteContext);

  // -------------
  // HOOKS
  // -------------

  const navigate = useNavigate();

  // -------------
  // STATE
  // -------------

  const [arrivalsGraphActiveIndex, setArrivalsGraphActiveIndex] = useState(0)
  const [onSiteTonightIndexActive, setOnSiteTonightIndexActive] = useState(0)
  const [onSiteNowIndexActive, setOnSiteNowIndexActive] = useState(0)

  // -------------
  // QUERIES
  // -------------

  // ARRIVALS QUERY
  const {
    isLoading: arrivalsAreLoading,
    isError: arrivalsAreError,
    data: arrivalsData,
    error: arrivalsError,
  } = useQuery<{ data: Booking[] | BookingSumm[] }, Error>(["ArrivalsByDate", now], () =>
    getBookings({
      guests: {
        some: {
          start: new Date(now).toISOString(),
        },
      },
      siteId: selectedSite!.id,
      status: BOOKING_STATUSES.CONFIRMED,
      orderBy: [
        {
          leadGuest: {
            lastName: "asc",
          },
        },
        {
          leadGuest: {
            firstName: "asc",
          },
        },
      ],
      include: {
        unit: true,
        leadGuest: true,
        guests: {
          include: {
            guestType: {
              include: {
                guestTypeGroup: true,
              },
            },
          },
        },
        payments: true,
      },
      token: user.token,
    })
  );

  // DEPARTURES QUERY
  const {
    isLoading: departuresAreLoading,
    isError: departuresAreError,
    data: departuresData,
    error: departuresError,
  } = useQuery<{ data: Booking[] | BookingSumm[] }, Error>(["DeparturesByDate", now], () =>
    getBookings({
      guests: {
        some: {
          end: new Date(now).toISOString(),
        },
      },
      siteId: selectedSite!.id,
      status: BOOKING_STATUSES.CONFIRMED,
      orderBy: [
        {
          leadGuest: {
            lastName: "asc",
          },
        },
        {
          leadGuest: {
            firstName: "asc",
          },
        },
      ],
      include: {
        unit: true,
        leadGuest: true,
        guests: {
          include: {
            guestType: {
              include: {
                guestTypeGroup: true,
              },
            },
          },
        },
        payments: true,
      },
      token: user.token,
    })
  );

  // COUNT ON SITE NOW QUERY
  const {
    isLoading: totalOnSiteNowIsLoading,
    isError: totalOnSiteNowIsError,
    data: totalOnSiteNowData,
    error: totalOnSiteNowError,
  } = useQuery<{ data: { totalOnSiteNow: [{ guestTypeGroupName: string, count: number }] } }, Error>(["TotalOnSite"], () =>
    getTotalOnSiteNow({
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // COUNT ON SITE TONIGHT QUERY
  const {
    isLoading: totalOnSiteTonightIsLoading,
    isError: totalOnSiteTonightIsError,
    data: totalOnSiteTonightData,
    error: totalOnSiteTonightError,
  } = useQuery<{ data: { totalOnSiteTonight: [{ guestTypeGroupName: string, count: number }] } }, Error>(["TotalOnSiteTonight"], () =>
    getTotalOnSiteTonight({
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // TOTAL PAYMENTS QUERY
  const {
    isLoading: totalPaymentsTodayIsLoading,
    isError: totalPaymentsTodayIsError,
    data: totalPaymentsTodayData,
    error: totalPaymentsTodayError,
  } = useQuery<{ data: { _sum: { paymentAmount: number } } }, Error>(["TotalPaymentsToday"], () =>
    getTotalPaymentsToday({
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // PENDING BOOKINGS QUERY
  const {
    isLoading: unconfirmedBookingsCountIsLoading,
    isError: unconfirmedBookingsCountIsError,
    data: unconfirmedBookingsCountData,
    error: unconfirmedBookingsCountError,
  } = useQuery<{ data: number }, Error>(["UnconfirmedBookingsCount"], () =>
    getUnconfirmedBookingsCount({
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // PAYMENTS BREAKDOWN TODAY QUERY
  const {
    isLoading: paymentsBreakdownTodayIsLoading,
    isError: paymentsBreakdownTodayIsError,
    data: paymentsBreakdownTodayData,
    error: paymentsBreakdownTodayError,
  } = useQuery<{ data: [{ _sum: { paymentAmount: number }, paymentMethod: string }] }, Error>(["PaymentsBreakdownToday"], () =>
    getPaymentsBreakdownToday({
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // -------------
  // USEEFFECTS
  // -------------

  // This useEffect iterates the active index for the onSiteTonight summary box.
  useEffect(() => {
    if (totalOnSiteTonightData) {
      const timeout = setTimeout(() => {
        const length = totalOnSiteTonightData.data.totalOnSiteTonight.length
        if (onSiteTonightIndexActive === length - 1) {
          setOnSiteTonightIndexActive(0)
        } else {
          setOnSiteTonightIndexActive(onSiteTonightIndexActive + 1)
        }
      }, 5000)

      // clean up
      return () => clearTimeout(timeout)
    }
  }, [totalOnSiteTonightData, onSiteTonightIndexActive])

  // This useEffect iterates the active index for the onSiteNow summary box.
  useEffect(() => {
    if (totalOnSiteNowData) {
      const timeout = setTimeout(() => {
        const length = totalOnSiteNowData.data.totalOnSiteNow.length
        if (onSiteNowIndexActive === length - 1) {
          setOnSiteNowIndexActive(0)
        } else {
          setOnSiteNowIndexActive(onSiteNowIndexActive + 1)
        }
      }, 5000)

      // clean up
      return () => clearTimeout(timeout)
    }
  }, [totalOnSiteNowData, onSiteNowIndexActive])

  // -------------
  // HELPERS
  // -------------

  function generateCompletePercentage(action: "ARRIVALS" | "DEPARTURES") {
    if (action === "ARRIVALS") {
      if (!arrivalsData || arrivalsData.data.length === 0) return "N/A";
    }
    if (action === "DEPARTURES") {
      if (!departuresData || departuresData.data.length === 0) return "N/A";
    }

    let totalExpected = 0;
    let totalComplete = 0;

    const arr: Booking[] = action === "ARRIVALS" ? (arrivalsData!.data as Booking[]) : (departuresData!.data as Booking[]);
    arr.forEach((booking) => {
      booking.guests!.forEach((guest: BookingGuest) => {
        const dateOfInterest = action === "ARRIVALS" ? guest.start : guest.end;
        // if guest is arriving today (remember there may be guests in the array that are arriving on other days)
        if (isSameDate(now, new Date(dateOfInterest))) {
          totalExpected++;
          if (action === "ARRIVALS") {
            if (guest.checkedIn) totalComplete++;
          }
          if (action === "DEPARTURES") {
            if (guest.checkedOut) totalComplete++;
          }
        }
      });
    });

    if (totalExpected === 0) return "N/A";
    return `${Math.floor((totalComplete / totalExpected) * 100)}%`;
  }

  const handleArrivalsGraphActiveIndexChange = (event: React.SyntheticEvent, newActiveIndex: number) => {
    setArrivalsGraphActiveIndex(newActiveIndex);
  };

  // -------------
  // RENDER
  // -------------

  if (arrivalsAreLoading || departuresAreLoading || totalOnSiteNowIsLoading || totalOnSiteTonightIsLoading || totalPaymentsTodayIsLoading || paymentsBreakdownTodayIsLoading || unconfirmedBookingsCountIsLoading) return <div>Loading...</div>;

  if (arrivalsAreError || departuresAreError || totalOnSiteNowIsError || totalOnSiteTonightIsError || totalPaymentsTodayIsError || paymentsBreakdownTodayIsError || unconfirmedBookingsCountIsError)
    return (
      <>
        {arrivalsError && <div>{arrivalsError.message}</div>}
        {departuresError && <div>{departuresError.message}</div>}
        {totalOnSiteNowError && <div>{totalOnSiteNowError.message}</div>}
        {totalOnSiteTonightError && <div>{totalOnSiteTonightError.message}</div>}
        {totalPaymentsTodayError && <div>{totalPaymentsTodayError.message}</div>}
        {paymentsBreakdownTodayError && <div>{paymentsBreakdownTodayError.message}</div>}
        {unconfirmedBookingsCountError && <div>{unconfirmedBookingsCountError.message}</div>}
      </>
    );

  return (
    <div id="dashboard" className="overflow-y-auto">

      { /* ARRIVALS FORECAST CHART */}

      <div
        id="arrival-forecast"
        className="container-white-bg-rounded-full-width"
      >
        <Typography variant="h6">Arrival Forecast</Typography>

        {/* Tab selector */}
        <div>
          <Tabs value={arrivalsGraphActiveIndex} onChange={handleArrivalsGraphActiveIndexChange} aria-label="arrivals graph tabs">
            {selectedSite?.guestTypeGroups?.filter(guestTypeGroup => guestTypeGroup.getAndReportArrivalTime === true).sort((a, b) => a.order - b.order).map(guestTypeGroup => (
              <Tab label={guestTypeGroup.name} />
            ))}
          </Tabs>
        </div>

        {selectedSite?.guestTypeGroups?.filter(guestTypeGroup => guestTypeGroup.getAndReportArrivalTime === true).sort((a, b) => a.order - b.order).map(guestTypeGroup => (
          <CustomTabPanel value={arrivalsGraphActiveIndex} index={0} >
            <ArrivalsGraph arrivalsData={arrivalsData!.data as Booking[]} height={300} />
          </CustomTabPanel>
        ))}

      </div>

      { /* QUICK MENU */}

      <div id="quick-menu" className="container-white-bg-rounded-full-width">
        <Typography variant="h6">Quick Links</Typography>
        <div id="quick-menu-buttons-container">
          <div
            className="quick-menu-button"
            onClick={() => navigate("/" + ROUTES.BOOKINGS + ROUTES.NEW)}
            style={{ backgroundColor: PRIMARYCOLOR }}
          >
            Make a New Booking
          </div>
          <div
            className="quick-menu-button"
            onClick={() => navigate("/" + ROUTES.GUESTS)}
            style={{ backgroundColor: SECONDARYCOLOR }}
          >
            Perform End of Day Cashup
          </div>
          <div
            className="quick-menu-button"
            onClick={() => navigate("/" + ROUTES.GUESTS)}
            style={{ backgroundColor: "purple" }}
          >
            Checkout All Guests Due to Depart
          </div>
        </div>
      </div>

      { /* ONSITE SUMMARY BLOCK */}

      <div id="on-site-summary">
        <SummaryBlock
          label="On Site Now"
          content={`${totalOnSiteNowData!.data.totalOnSiteNow[onSiteNowIndexActive].count}`}
          subLabel={totalOnSiteTonightData?.data.totalOnSiteTonight[onSiteNowIndexActive].guestTypeGroupName}
          background={"purple"}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* ARRIVED SUMMARY BLOCK */}

      <div id="arrived-summary">
        <SummaryBlock
          label="Arrived Today"
          content={`${generateCompletePercentage("ARRIVALS")}`}
          background={SECONDARYCOLOR}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* DEPARTED SUMMARY BLOCK */}

      <div id="departed-summary">
        <SummaryBlock
          label="Departed Today"
          content={`${generateCompletePercentage("DEPARTURES")}`}
          background={PRIMARYCOLOR}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* ON SITE TONIGHT SUMMARY BLOCK */}

      <div id="on-site-tonight">
        <SummaryBlock
          label="On Site Tonight"
          content={totalOnSiteTonightData?.data.totalOnSiteTonight[onSiteTonightIndexActive].count!}
          subLabel={totalOnSiteTonightData?.data.totalOnSiteTonight[onSiteTonightIndexActive].guestTypeGroupName}
          background={"purple"}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* TOTAL INCOME SUMMARY BLOCK */}

      <div id="income-summary">
        <SummaryBlock
          label="Total Income Today"
          content={`£${totalPaymentsTodayData?.data._sum.paymentAmount ? totalPaymentsTodayData?.data._sum.paymentAmount : 0}`}
          background={SECONDARYCOLOR}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* PENDING BOOKINGS SUMMARY BLOCK */}

      <div id="pending-bookings">
        <SummaryBlock
          label="Pending Bookings"
          content={unconfirmedBookingsCountData ? unconfirmedBookingsCountData.data : 0}
          background={PRIMARYCOLOR}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* DAILY INCOME BREAKDOWN CHART */}

      <div
        id="daily-income-breakdown"
        className="container-white-bg-rounded-full-width h-full"
      >
        <Typography variant="h6">Daily Income Breakdown</Typography>
        <BarChart
          series={paymentsBreakdownTodayData ? paymentsBreakdownTodayData.data.map(datapoint => ({ data: [datapoint._sum.paymentAmount], label: datapoint.paymentMethod })) : []}
          xAxis={[{ scaleType: "band", data: ["Today"] }]}
          colors={[PRIMARYCOLOR, SECONDARYCOLOR, "purple"]}
        />
      </div>

    </div>
  );
};

export default Dashboard;
