import React, { useContext } from "react";
import { useQuery } from "react-query";
import { LeadGuest } from "../../types";
import { getLeadGuests } from "../../services/queries/getGuests";
import DataTable from "../../components/DataTable";
import { IconButton, Paper, TableContainer, Typography } from "@mui/material";
import AuthContext from "../../contexts/authContext";
import PageHeader from "../../components/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const columnSpec = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Surname", width: 130 },
  { field: "address1", headerName: "Address Line 1", width: 90 },
  { field: "address2", headerName: "Address Line 2", width: 160 },
  { field: "townCity", headerName: "Town/City", width: 160 },
  { field: "postcode", headerName: "Postcode", width: 90 },
  { field: "tel", headerName: "Tel", width: 90 },
  { field: "email", headerName: "Email", width: 90 },
];

const Guests = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, isError, data: LeadGuestData, error } = useQuery<{data: LeadGuest[]}, Error>(
    ["guests", user.tenantId],
    () => getLeadGuests({ token: user.token })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id="guests" className="full-width">
      <PageHeader title="Guests">
      <IconButton
          onClick={() => console.log("Add guest")}
          size="large"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>
      <TableContainer component={Paper} className="container-white-bg-rounded-full-width margin-bottom-1">
        <DataTable rows={LeadGuestData!.data} columns={columnSpec} />
      </TableContainer>
    </div>
  );
};

export default Guests;
