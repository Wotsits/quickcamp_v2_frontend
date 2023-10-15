import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { today1200 } from "../../utils/dateTimeManipulation";
import AuthContext from "../../contexts/authContext";
import { useQuery } from "react-query";
import { Booking } from "../../types";
import { getArrivalsByDate } from "../../services/queries/getArrivalsByDate";

const Arrivals = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user, selectedSite } = useContext(AuthContext);

  // -------------
  // STATE
  // -------------

  const [date, setDate] = useState<Date | null>(today1200());

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading: arrivalsAreLoading,
    isError: arrivalsAreError,
    data: arrivalsData,
    error: arrivalsError,
  } = useQuery<Booking[], Error>(["ArrivalsByDate", date], () =>
    getArrivalsByDate({
      date: date as Date,
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  if (arrivalsAreLoading) return <div>Loading...</div>;

  if (arrivalsAreError) return <div>Error: {arrivalsError?.message}</div>;

  return (
    <div id="arrivals">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Arrivals
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Booking Name</TableCell>
              <TableCell align="right">Arriving Today</TableCell>
              <TableCell align="right">Arrived Today</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrivalsData && arrivalsData.length === 0 && (
              <TableRow
                key="no-arrivals"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" colSpan={3}>
                  No arrivals today
                </TableCell>
              </TableRow>
            )}
            {arrivalsData &&
              arrivalsData.map((arrival) => (
                <TableRow
                  key={arrival.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {arrival.leadGuest.firstName} {arrival.leadGuest.lastName}
                  </TableCell>
                  <TableCell align="right">
                    {arrival.guests!.length}
                  </TableCell>
                  <TableCell align="right">
                    {arrival.guests!.length}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Arrivals;
