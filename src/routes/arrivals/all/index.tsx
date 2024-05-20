import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  IconButton,
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
import SummaryBlock from "../../../components/molecules/SummaryBlock";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PageHeader from "../../../components/molecules/PageHeader";
import ArrivalsGraph from "../../../components/organisms/ArrivalsGraph";
import { ROUTES } from "../../../settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SiteContext from "../../../contexts/sitesContext";
import { calculateNumberOfType, countTotalToday } from "../helpers";

const summaryBlockSettings = {
  background:
    "linear-gradient(90deg, rgba(0,4,40,1) 35%, rgba(0,78,146,1) 100%)",
  foregroundColor: "white",
  minWidth: "300px",
  height: "200px",
};

const Arrivals = () => {
  // -------------
  // CONTEXT
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
  } = useQuery<{ data: Booking[] }, Error>(["ArrivalsByDate", date], () =>
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
    <div id="arrivals" className="full-width flex-column h-full">
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

      <div className="flex-grow overflow-y-auto">
        <div id="accordion-container">
        <Accordion
          expanded={summaryExpanded}
          onChange={() => setSummaryExpanded(!summaryExpanded)}
        >

          {/* SUMMARY BLOCKS SECTION HEADING */}

          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="daily-arrival-summary-content"
            id="daily-arrival-summary-header"
          >
            <Typography component="h2" variant="h6">
              Today's Summary
            </Typography>
          </AccordionSummary>

          {/* SUMMARY BLOCKS */}

          <AccordionDetails>
            <div id="summary-blocks">
              <SummaryBlock
                label="Bookings With Arrivals Today"
                content={`${arrivalsData!.data.length}`}
                {...summaryBlockSettings}
              />
              {selectedSite?.guestTypeGroups?.map(guestTypeGroup => {
                const guestTypeGroupId = guestTypeGroup.id
                const numberOfTypeDue = calculateNumberOfType(guestTypeGroupId, arrivalsData!.data, "DUE")
                const numberOfTypeArrived = calculateNumberOfType(guestTypeGroupId, arrivalsData!.data, "ARRIVED")
                
                return (
                  <SummaryBlock
                    label={`${guestTypeGroup.name} Arriving Today`}
                    content={`${numberOfTypeArrived} in of ${numberOfTypeDue}`}
                    {...summaryBlockSettings}
                  />
                )
              })}
            </div>

            {/* ARRIVALS PROGRESS GRAPH */}

            <div
              id="arrival-progress"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ArrivalsGraph
                arrivalsData={arrivalsData!.data}
                height={300}
                width={500}
              />
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

                {/* TABLE HEADER */}

                <TableHead>
                  <TableRow>
                    <TableCell>Booking Name</TableCell>
                    {selectedSite?.guestTypeGroups?.map(guestTypeGroup => (
                      <TableCell align="right">{`${guestTypeGroup.name}`}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                {/* TABLE BODY */}

                <TableBody>
                  {arrivalsData && arrivalsData.data.length === 0 && (
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
                    arrivalsData.data.map((arrival) => {
                      const arrivedToday = countTotalToday(
                        arrival.guests,
                        "CHECKED-IN",
                        date as Date
                      );
                      const dueToday = countTotalToday(
                        arrival.guests,
                        "DUE",
                        date as Date
                      );
                      
                      return (
                        <TableRow
                          key={arrival.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          onClick={() => navigate(`/arrivals/${arrival.id}/`)}
                          hover
                          className="clickable"
                        >

                          {/* NAME AND CHIP */}

                          <TableCell component="th" scope="row">
                            {arrival.leadGuest.firstName}{" "}
                            {arrival.leadGuest.lastName}
                            {dueToday === arrivedToday && (
                              <Chip
                                label={"all arrived"}
                                variant="filled"
                                size="small"
                                color="success"
                                sx={{ marginLeft: 1 }}
                              />
                            )}
                            {arrivedToday === 0 && (
                              <Chip
                                label={"none arrived"}
                                variant="filled"
                                size="small"
                                color="error"
                                sx={{ marginLeft: 1 }}
                              />
                            )}
                            {dueToday > arrivedToday &&
                              arrivedToday !== 0 && (
                                <Chip
                                  label={"some arrived"}
                                  variant="filled"
                                  size="small"
                                  color="warning"
                                  sx={{ marginLeft: 1 }}
                                />
                              )}
                          </TableCell>

                          {/* GUEST TYPE COLUMNS */}

                          {selectedSite?.guestTypeGroups?.map(guestTypeGroup => {
                            const guestTypeGroupId = guestTypeGroup.id
                            const numberOfTypeDue = calculateNumberOfType(guestTypeGroupId, [arrival], "DUE")
                            const numberOfTypeArrived = calculateNumberOfType(guestTypeGroupId, [arrival], "ARRIVED")

                            return (
                              <TableCell align="right">
                                {numberOfTypeArrived}/{numberOfTypeDue}
                              </TableCell>
                            )
                          })}
          
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </div>
      </div>
      
    </div>
  );
};

export default Arrivals;
