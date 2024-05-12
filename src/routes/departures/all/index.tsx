import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SummaryBlock from "../../../components/molecules/SummaryBlock";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PageHeader from "../../../components/molecules/PageHeader";
import { ROUTES } from "../../../settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getDeparturesByDate } from "../../../services/queries/getDeparturesByDate";
import "../style.css";
import SitesContext from "../../../contexts/sitesContext";
import { calculateNumberOfTypeDeparting } from "../helpers";

const summaryBlockSettings = {
  background:
    "linear-gradient(90deg, rgba(0,4,40,1) 35%, rgba(0,78,146,1) 100%)",
  foregroundColor: "white",
  width: "150px",
  height: "150px",
};

const countTotalToday = (
  array: Booking["guests"],
  status: "CHECKED-OUT" | "DUE",
  today: Date
) => {
  if (!array) return 0;
  if (!status) return array.length;
  if (!today) return array.length;

  const departingToday = array.filter((item) => {
    const departureDate = new Date(item.end);
    return (
      departureDate.getDate() === today.getDate() &&
      departureDate.getMonth() === today.getMonth() &&
      departureDate.getFullYear() === today.getFullYear()
    );
  });

  if (status === "CHECKED-OUT") {
    return departingToday.filter((item) => item.checkedOut).length;
  }
  if (status === "DUE") {
    return departingToday.length;
  }
};

const Departures = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);
  const { selectedSite } = useContext(SitesContext);

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
    isLoading: departuresAreLoading,
    isError: departuresAreError,
    data: departuresData,
    error: departuresError,
  } = useQuery<{ data: Booking[] }, Error>(["DeparturesByDate", date], () =>
    getDeparturesByDate({
      date: date as Date,
      token: user.token,
      siteId: selectedSite!.id,
    })
  );

  // -------------
  // RENDER
  // -------------

  if (departuresAreLoading) return <div>Loading...</div>;

  if (departuresAreError) return <div>Error: {departuresError?.message}</div>;

  return (
    <div id="departures" className="full-width">

      {/* PAGE HEADER */}

      <PageHeader title="Departures">
        <IconButton
          onClick={() => navigate("/" + ROUTES.BOOKINGS + ROUTES.NEW)}
          size="large"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

      <div className="container-white-bg-rounded-full-width margin-bottom-1">
        <div id="departures-datepicker">
          <DatePicker
            onChange={(value: Date | null) =>
              setDate(setDateToMidday(value as Date))
            }
            value={date}
            label={"Departure Date"}
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

          {/* SUMMARY BLOCKS SECTION HEADING */}

          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="daily-departure-summary-content"
            id="daily-departure-summary-header"
          >
            <Typography component="h2" variant="h6">
              Today's Summary
            </Typography>
          </AccordionSummary>

          {/* SUMMARY BLOCKS */}

          <AccordionDetails>
            <div id="summary-blocks">
              <SummaryBlock
                label="Bookings Departing Today"
                content={departuresData!.data.length} // TODO correct this
                {...summaryBlockSettings}
              />
              {selectedSite?.guestTypeGroups?.map(guestTypeGroup => {
                const guestTypeGroupId = guestTypeGroup.id
                const numberOfTypeDueToDepart = calculateNumberOfTypeDeparting(guestTypeGroupId, departuresData!.data, "DUE")
                const numberOfTypeDeparted = calculateNumberOfTypeDeparting(guestTypeGroupId, departuresData!.data, "DEPARTED")

                return (
                  <SummaryBlock
                    label={`${guestTypeGroup.name} Departing Today`}
                    content={`${numberOfTypeDeparted} in of ${numberOfTypeDueToDepart}`}
                    {...summaryBlockSettings}
                  />
                )
              })}
            </div>
          </AccordionDetails>

        </Accordion>

        <Accordion
          expanded={tableExpanded}
          onChange={() => setTableExpanded(!tableExpanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="daily-departure-list-content"
            id="daily-departure-list-header"
          >
            <Typography component="h2" variant="h6">
              Today's Departures List
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>

              <Table aria-label="simple table">

                <TableHead>
                  <TableRow>
                    <TableCell>Booking Name</TableCell>
                    {selectedSite?.guestTypeGroups?.map(guestTypeGroup => (
                      <TableCell align="right">{`${guestTypeGroup.name}`}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {departuresData && departuresData.data.length === 0 && (
                    <TableRow
                      key="no-departures"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" colSpan={3}>
                        No departures today
                      </TableCell>
                    </TableRow>
                  )}

                  {departuresData &&
                    departuresData.data.map((departure) => (
                      <TableRow
                        key={departure.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        onClick={() => navigate(`/departures/${departure.id}/`)}
                        hover
                        className="clickable"
                      >
                        <TableCell component="th" scope="row">
                          {departure.leadGuest.firstName}{" "}
                          {departure.leadGuest.lastName}
                        </TableCell>

                        {selectedSite?.guestTypeGroups?.map(guestTypeGroup => {
                          const guestTypeGroupId = guestTypeGroup.id
                          const numberOfTypeDueToDepart = calculateNumberOfTypeDeparting(guestTypeGroupId, [departure], "DUE")
                          const numberOfTypeDeparting = calculateNumberOfTypeDeparting(guestTypeGroupId, [departure], "DEPARTED")

                          return (
                            <TableCell align="right">
                              {numberOfTypeDeparting}/{numberOfTypeDueToDepart}
                            </TableCell>
                          )
                        })}

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

export default Departures;
