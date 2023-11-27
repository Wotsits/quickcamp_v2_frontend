import { Typography } from "@mui/material";
import React, { useContext } from "react";
import PageHeader from "../../components/PageHeader";
import { useQuery } from "react-query";
import { Booking } from "../../types";
import { getArrivalsByDate } from "../../services/queries/getArrivalsByDate";
import AuthContext from "../../contexts/authContext";
import ArrivalsGraph from "../../components/ArrivalsGraph";
import './style.css'

const now = new Date();

const Dashboard = () => {

  // -------------
  // CONTEXTS
  // -------------

  const {user, selectedSite} = useContext(AuthContext)

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
  
  return (
    <div id="dashboard">
      <PageHeader title="Dashboard" />
      <div id="dashboard-top-section" className="section">
        <Typography variant="h6">Arrivals Forecast</Typography>
        <ArrivalsGraph arrivalsData={arrivalsData} padding={0} />
      </div>
    </div>
  );
};

export default Dashboard;
