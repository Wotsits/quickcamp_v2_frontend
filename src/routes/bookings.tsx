import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getBookings } from "../services/queries/getBookings";
import DataTable from "../components/DataTable";
import { Booking } from "../types";
import { Typography } from "@mui/material";
import AuthContext from "../contexts/authContext";

const columnSpec = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "start", headerName: "Start Date", width: 130 },
  { field: "end", headerName: "End Date", width: 130 },
  { field: "unit.name", headerName: "Unit", width: 90 },
  { field: "totalFee", headerName: "Fee", width: 160 },
  { field: "leadGuest", headerName: "Lead Guest", width: 160 },
  { field: "adults", headerName: "Adults", width: 90 },
  { field: "children", headerName: "Children", width: 90 },
  { field: "infants", headerName: "Infants", width: 90 },
  { field: "pets", headerName: "Pets", width: 90 },
  { field: "vehicles", headerName: "Vehicles", width: 90 },
];

const Bookings = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, isError, data, error } = useQuery<Booking[], Error>(
    ["bookings"],
    () => getBookings({ token: user.token })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id="bookings">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Bookings
      </Typography>
      <DataTable rows={data!} columns={columnSpec} />
    </div>
  );
};

export default Bookings;
