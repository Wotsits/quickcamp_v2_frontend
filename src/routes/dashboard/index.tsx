import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Booking } from "../../types";
import { getArrivalsByDate } from "../../services/queries/getArrivalsByDate";
import AuthContext from "../../contexts/authContext";
import ArrivalsGraph from "../../components/ArrivalsGraph";
import "./style.css";
import { PRIMARYCOLOR, ROUTES } from "../../settings";
import { useNavigate } from "react-router-dom";
import SummaryBlock from "../../components/SummaryBlock";

const now = new Date();

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
  // RENDER
  // -------------

  if (arrivalsAreLoading) return <div>Loading...</div>;

  if (arrivalsAreError) return <div>Error: {arrivalsError?.message}</div>;

  console.log(arrivalsData)

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
        <div>
          <Button variant="contained" onClick={() => navigate("/" + ROUTES.BOOKINGS + ROUTES.NEW)}>New Booking</Button>
        </div>
        <div>
          <Button variant="contained" onClick={() => navigate("/" + ROUTES.GUESTS)}>End of Day</Button>
        </div>
      </div>
      <div id="on-site-summary">
        <SummaryBlock inverted label="on site" content="21" background={PRIMARYCOLOR} foregroundColor="white" width="100%" height="100%" />
      </div>
      <div id="arrived-summary">
        <SummaryBlock inverted label="arrived" content="21%" background={PRIMARYCOLOR} foregroundColor="white" width="100%" height="100%" />
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
