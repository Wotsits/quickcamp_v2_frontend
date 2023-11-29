import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Booking, BookingGuest } from "../../types";
import { getArrivalsByDate } from "../../services/queries/getArrivalsByDate";
import AuthContext from "../../contexts/authContext";
import ArrivalsGraph from "../../components/ArrivalsGraph";
import "./style.css";
import { PRIMARYCOLOR, ROUTES, SECONDARYCOLOR } from "../../settings";
import { useNavigate } from "react-router-dom";
import SummaryBlock from "../../components/SummaryBlock";
import { today1200 } from "../../utils/dateTimeManipulation";

const now = today1200()

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

  const {
    isLoading: arrivalsAreLoading,
    isError: arrivalsAreError,
    data: arrivalsData,
    error: arrivalsError,
  } = useQuery<Booking[], Error>(["ArrivalsByDate", now], () =>
    getArrivalsByDate({
      date: now,
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // -------------
  // HELPERS
  // -------------

  function generateArrivalsCompletePercentage() {
    if (!arrivalsData || arrivalsData.length === 0) return "N/A";
    let totalArrivals = 0;
    let totalArrived = 0; 
    arrivalsData.forEach((booking) => {
      booking.guests!.forEach((guest) => {
        totalArrivals++;
        if (guest.checkedIn) totalArrived++;
      });
    });
    return `${Math.floor((totalArrived / totalArrivals) * 100)}%`;
  }

  // -------------
  // RENDER
  // -------------

  if (arrivalsAreLoading) return <div>Loading...</div>;

  if (arrivalsAreError) return <div>Error: {arrivalsError?.message}</div>;

  return (
    <div id="dashboard">
      <div 
        id="arrival-forecast"
        className="container-white-bg-rounded-full-width"
      >
        <Typography variant="h6">Arrival Forecast</Typography>
        <ArrivalsGraph arrivalsData={arrivalsData!} />
      </div>
      <div id="quick-menu" className="container-white-bg-rounded-full-width">
        <Typography variant="h6">Quick Links</Typography>
        <div id="quick-menu-buttons-container">
          <div className="quick-menu-button" onClick={() => navigate("/" + ROUTES.BOOKINGS + ROUTES.NEW)} >
            Make a New Booking
          </div>
          <div className="quick-menu-button" onClick={() => navigate("/" + ROUTES.GUESTS)}>
            Perform End of Day Cashup
          </div>
          <div className="quick-menu-button" onClick={() => navigate("/" + ROUTES.GUESTS)}>
            Checkout All Guests Due to Depart
          </div>
        </div>
        
      </div>
      <div id="on-site-summary">
        <SummaryBlock inverted label="on site" content="21" background={PRIMARYCOLOR} foregroundColor="white" width="100%" height="100%" />
      </div>
      <div id="arrived-summary">
        <SummaryBlock inverted label="arrived" content={`${generateArrivalsCompletePercentage()}`} background={PRIMARYCOLOR} foregroundColor="white" width="100%" height="100%" />
      </div>
      <div id="departed-summary">
        <SummaryBlock inverted label="departed" content="100%" background={PRIMARYCOLOR} foregroundColor="white" width="100%" height="100%" />
      </div>
      <div id="income-summary">
        <SummaryBlock inverted label="total income today" content="£9,458" background={PRIMARYCOLOR} foregroundColor="white" width="100%" height="100%" />
      </div>
      <div id="daily-income-breakdown"className="container-white-bg-rounded-full-width">
        <Typography variant="h6">Daily Income Breakdown</Typography>
      </div>
      <div id="pending-bookings">
        <SummaryBlock inverted label="pending bookings" content="21%" background={PRIMARYCOLOR} foregroundColor="white" width="100%" height="100%" />
      </div>
    </div>
  );
};

export default Dashboard;
