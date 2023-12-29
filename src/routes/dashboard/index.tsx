import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Booking, BookingGuest } from "../../types";
import { getArrivalsByDate } from "../../services/queries/getArrivalsByDate";
import AuthContext from "../../contexts/authContext";
import ArrivalsGraph from "../../components/organisms/ArrivalsGraph";
import "./style.css";
import { PRIMARYCOLOR, ROUTES, SECONDARYCOLOR } from "../../settings";
import { useNavigate } from "react-router-dom";
import SummaryBlock from "../../components/molecules/SummaryBlock";
import { today1200 } from "../../utils/dateTimeManipulation";
import { getDeparturesByDate } from "../../services/queries/getDeparturesByDate";
import { isSameDate } from "../../utils/helpers";
import { getTotalOnSite } from "../../services/queries/getTotalOnSite";
import { BarChart } from "@mui/x-charts";

const now = today1200();

const Dashboard = () => {
  // -------------
  // CONTEXTS
  // -------------

  const { user, selectedSite } = useContext(AuthContext);

  // -------------
  // HOOKS
  // -------------

  const navigate = useNavigate();

  // -------------
  // QUERIES
  // -------------

  // ARRIVALS QUERY
  const {
    isLoading: arrivalsAreLoading,
    isError: arrivalsAreError,
    data: arrivalsData,
    error: arrivalsError,
  } = useQuery<{data: Booking[]}, Error>(["ArrivalsByDate", now], () =>
    getArrivalsByDate({
      date: now,
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // DEPARTURES QUERY
  const {
    isLoading: departuresAreLoading,
    isError: departuresAreError,
    data: departuresData,
    error: departuresError,
  } = useQuery<{data: Booking[]}, Error>(["DeparturesByDate", now], () =>
    getDeparturesByDate({
      date: now,
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // COUNT ON SITE QUERY
  const {
    isLoading: totalOnSiteIsLoading,
    isError: totalOnSiteIsError,
    data: totalOnSiteData,
    error: totalOnSiteError,
  } = useQuery<{data: {totalOnSite: number}}, Error>(["TotalOnSite"], () =>
    getTotalOnSite({
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // TOTAL INCOME QUERY

  // PENDING BOOKINGS QUERY

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

    const arr = action === "ARRIVALS" ? arrivalsData!.data : departuresData!.data;
    arr.forEach((booking) => {
      booking.guests!.forEach((guest) => {
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

  // -------------
  // RENDER
  // -------------

  if (arrivalsAreLoading || departuresAreLoading || totalOnSiteIsLoading) return <div>Loading...</div>;

  if (arrivalsAreError || departuresAreError || totalOnSiteIsError)
    return (
      <>
        {arrivalsError && <div>{arrivalsError.message}</div>}
        {departuresError && <div>{departuresError.message}</div>}
        {totalOnSiteError && <div>{totalOnSiteError.message}</div>}
      </>
    );

  return (
    <div id="dashboard">

      { /* ARRIVALS FORECAST CHART */ }

      <div
        id="arrival-forecast"
        className="container-white-bg-rounded-full-width"
      >
        <Typography variant="h6">Arrival Forecast</Typography>
        <ArrivalsGraph arrivalsData={arrivalsData!.data} />
      </div>

      { /* QUICK MENU */ }

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
          inverted
          label="on site now"
          content={`${totalOnSiteData!.data.totalOnSite}`}
          background={"purple"}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* ARRIVED SUMMARY BLOCK */}

      <div id="arrived-summary">
        <SummaryBlock
          inverted
          label="arrived"
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
          inverted
          label="departed"
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
          inverted
          label="on site tonight"
          content="-"
          background={"purple"}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* TOTAL INCOME SUMMARY BLOCK */}

      <div id="income-summary">
        <SummaryBlock
          inverted
          label="total income today"
          content="£-"
          background={SECONDARYCOLOR}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* PENDING BOOKINGS SUMMARY BLOCK */}

      <div id="pending-bookings">
        <SummaryBlock
          inverted
          label="pending bookings"
          content="-"
          background={PRIMARYCOLOR}
          foregroundColor="white"
          width="100%"
          height="100%"
        />
      </div>

      { /* DAILY INCOME BREAKDOWN CHART */}

      <div
        id="daily-income-breakdown"
        className="container-white-bg-rounded-full-width"
      >
        <Typography variant="h6">Daily Income Breakdown</Typography>
        {/* TODO: add data to the chart */}
        <BarChart
          series={[{ data: [4300], label: "Online Payment"}, { data: [2523], label: "Cash Payment"}, { data: [1200], label: "Card Payment"}]}
          xAxis={[{ scaleType: "band", data: ["Today"] }]}
          colors={[PRIMARYCOLOR, SECONDARYCOLOR, "purple"]}
        />
      </div>
      
    </div>
  );
};

export default Dashboard;
