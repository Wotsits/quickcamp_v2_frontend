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

const summaryBlockSettings = {
  background:
    "linear-gradient(90deg, rgba(0,4,40,1) 35%, rgba(0,78,146,1) 100%)",
  foregroundColor: "white",
  width: "150px",
  height: "150px",
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

  if (arrivalsAreLoading) return <div>Loading...</div>;

  if (arrivalsAreError) return <div>Error: {arrivalsError?.message}</div>;

  return (
    <div id="arrivals">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Arrivals
      </Typography>

      <Box
        id="arrivals-datepicker"
        className="arrivals-datepicker"
      >
        <DatePicker
          onChange={(value: Date | null) =>
            setDate(setDateToMidday(value as Date))
          }
          value={date}
          label={"Arrival Date"}
        />
        <Box>
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
            <div id="arrival-progress">
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                Arrivals Progress Graph Here
              </div>
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
                          {arrival.guests!.length}
                        </TableCell>
                        <TableCell align="right">
                          {arrival.pets!.length}
                        </TableCell>
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
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Arrivals;
