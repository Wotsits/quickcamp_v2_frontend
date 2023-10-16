import {
  Box,
  Button,
  Icon,
  IconButton,
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
import {
  setDateToMidday,
  today1200,
} from "../../../utils/dateTimeManipulation";
import AuthContext from "../../../contexts/authContext";
import { useQuery } from "react-query";
import { Booking } from "../../../types";
import { getArrivalsByDate } from "../../../services/queries/getArrivalsByDate";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Arrivals = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user, selectedSite } = useContext(AuthContext);

  // -------------
  // HOOKS
  // -------------

  const navigate = useNavigate();

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

      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        id="booking-calendar-datepicker"
        className="booking-calendar-datepicker"
      >
        <DatePicker
          onChange={(value: Date | null) =>
            setDate(setDateToMidday(value as Date))
          }
          value={date}
          label={"Calendar start date"}
        />
        <Box sx={{ ml: 2 }}>
          <Button variant="contained" onClick={() => setDate(today1200())}>
            Today
          </Button>
          <IconButton
            onClick={() => setDate(new Date(date!.getTime() - 86400000))}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => setDate(new Date(date!.getTime() + 86400000))}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Booking Name</TableCell>
              <TableCell align="right">People Arriving Today</TableCell>
              <TableCell align="right">Pets Arriving Today</TableCell>
              <TableCell align="right">Vehicles Arriving Today</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                  <TableCell align="right">{arrival.guests!.length}</TableCell>
                  <TableCell align="right">{arrival.pets!.length}</TableCell>
                  <TableCell align="right">
                    {arrival.vehicles!.length}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="success"
                      size="small"
                      sx={{ mr: -1 }}
                      onClick={() => navigate(`/arrivals/${arrival.id}/`)}
                    >
                      CheckIn
                    </Button>
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
