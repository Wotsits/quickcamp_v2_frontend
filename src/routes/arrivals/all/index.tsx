import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import SummaryBlock from "../../../components/SummaryBlock";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PageHeader from "../../../components/PageHeader";
import ArrivalsGraph from "../../../components/ArrivalsGraph";
import { ROUTES } from "../../../settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const summaryBlockSettings = {
  background:
    "linear-gradient(90deg, rgba(0,4,40,1) 35%, rgba(0,78,146,1) 100%)",
  foregroundColor: "white",
  width: "150px",
  height: "150px",
};

const countTotalToday = (
  array: Booking["guests"] | Booking["pets"] | Booking["vehicles"],
  status: "CHECKED-IN" | "DUE",
  today: Date
) => {
  if (!array) return 0;
  if (!status) return array.length;
  if (!today) return array.length;

  const arrivingToday = array.filter((item) => {
    const arrivalDate = new Date(item.start);
    return (
      arrivalDate.getDate() === today.getDate() &&
      arrivalDate.getMonth() === today.getMonth() &&
      arrivalDate.getFullYear() === today.getFullYear()
    );
  });

  if (status === "CHECKED-IN") {
    return arrivingToday.filter((item) => item.checkedIn).length;
  }
  if (status === "DUE") {
    return arrivingToday.length;
  }
};

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
  const [summaryExpanded, setSummaryExpanded] = useState<boolean>(false);
  const [tableExpanded, setTableExpanded] = useState<boolean>(true);

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

  // -------------
  // RENDER
  // -------------

  if (arrivalsAreLoading) return <div>Loading...</div>;

  if (arrivalsAreError) return <div>Error: {arrivalsError?.message}</div>;

  return (
    <div id="arrivals" className="full-width">
      
      <PageHeader title="Arrivals">
        <IconButton
          onClick={() => navigate("/" + ROUTES.BOOKINGS + ROUTES.NEW)}
          size="large"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

      <div className="container-white-bg-rounded-full-width margin-bottom-1">
        <div id="arrivals-datepicker">
          <DatePicker
            onChange={(value: Date | null) =>
              setDate(setDateToMidday(value as Date))
            }
            value={date}
            label={"Arrival Date"}
          />
          <div>
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
          </div>
        </div>
      </div>

      <div id="accordion-container">
        <Accordion
          expanded={summaryExpanded}
          onChange={() => setSummaryExpanded(!summaryExpanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="daily-arrival-summary-content"
            id="daily-arrival-summary-header"
          >
            <Typography component="h2" variant="h6">
              Today's Summary
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div id="summary-blocks">
              <SummaryBlock
                label="Bookings Arriving Today"
                content={arrivalsData!.length}
                {...summaryBlockSettings}
              />
              <SummaryBlock
                label="People Arriving Today"
                content={arrivalsData!.length}
                {...summaryBlockSettings}
              />
              <SummaryBlock
                label="Cars Arriving Today"
                content={arrivalsData!.length}
                {...summaryBlockSettings}
              />
              <SummaryBlock
                label="Pets Arriving Today"
                content={arrivalsData!.length}
                {...summaryBlockSettings}
              />
            </div>
            <div
              id="arrival-progress"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ArrivalsGraph arrivalsData={arrivalsData} height={300} width={500}/>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={tableExpanded}
          onChange={() => setTableExpanded(!tableExpanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="daily-arrival-list-content"
            id="daily-arrival-list-header"
          >
            <Typography component="h2" variant="h6">
              Today's Arrivals List
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table aria-label="simple table">
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {arrival.leadGuest.firstName}{" "}
                          {arrival.leadGuest.lastName}
                        </TableCell>
                        <TableCell align="right">
                          {countTotalToday(
                            arrival.guests,
                            "CHECKED-IN",
                            date as Date
                          )}
                          /
                          {countTotalToday(arrival.guests, "DUE", date as Date)}
                        </TableCell>
                        <TableCell align="right">
                          {countTotalToday(
                            arrival.pets,
                            "CHECKED-IN",
                            date as Date
                          )}
                          /{countTotalToday(arrival.pets, "DUE", date as Date)}
                        </TableCell>
                        <TableCell align="right">
                          {countTotalToday(
                            arrival.vehicles,
                            "CHECKED-IN",
                            date as Date
                          )}
                          /
                          {countTotalToday(
                            arrival.vehicles,
                            "DUE",
                            date as Date
                          )}
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
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Arrivals;
