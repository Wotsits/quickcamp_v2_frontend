import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getBookings } from "../../../services/queries/getBookings";
import DataTable from "../../../components/DataTable";
import { Booking } from "../../../types";
import { Box, IconButton, Typography } from "@mui/material";
import AuthContext from "../../../contexts/authContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../settings";

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
  // -----------
  // CONTEXT
  // -----------

  const { user, selectedSite } = useContext(AuthContext);
  
  // -----------  
  // HOOKS
  // -----------
  
  const navigate = useNavigate();

  // -----------  
  // QUERIES
  // -----------  
  
  const { isLoading, isError, data, error } = useQuery<Booking[], Error>(
    ["bookings"],
    () => getBookings({ token: user.token, siteId: selectedSite!.id })
  );

  // -----------  
  // RENDER
  // -----------
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id="bookings">
      <Box
        marginBottom={2}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        width="100%"
      >
        <Typography sx={{ margin: 0 }} variant="h5" gutterBottom>
          Bookings
        </Typography>
        <IconButton size={"large"} onClick={() => navigate(ROUTES.ROOT+ROUTES.BOOKINGS+ROUTES.CALENDAR) }>
          <AddCircleIcon color={"primary"} fontSize="large" />
        </IconButton>
      </Box>

      <DataTable rows={data!} columns={columnSpec} />
    </div>
  );
};

export default Bookings;
