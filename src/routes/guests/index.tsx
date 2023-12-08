import React, { useContext } from "react";
import { useQuery } from "react-query";
import { LeadGuest } from "../../types";
import { getLeadGuests } from "../../services/queries/getGuests";
import DataTable from "../../components/DataTable";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AuthContext from "../../contexts/authContext";
import PageHeader from "../../components/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const columns: {
  headerText: string;
  dataField: keyof LeadGuest;
}[] = [
  {
    headerText: "ID",
    dataField: "id",
  },
  {
    headerText: "First Name",
    dataField: "firstName",
  },
  {
    headerText: "Last Name",
    dataField: "lastName",
  },
  {
    headerText: "Email",
    dataField: "email",
  },
  {
    headerText: "Tel",
    dataField: "tel",
  },
  {
    headerText: "Address Line 1",
    dataField: "address1",
  },
  {
    headerText: "Address Line 2",
    dataField: "address2",
  },
  {
    headerText: "Town/City",
    dataField: "townCity",
  },
  {
    headerText: "County",
    dataField: "county",
  },
  {
    headerText: "Postcode",
    dataField: "postcode",
  },
];

const Guests = () => {
  // -------------
  // CONTEXTS
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data: leadGuestData, error } = useQuery<{data: LeadGuest[]}, Error>(
    ["guests", user.tenantId],
    () => getLeadGuests({ token: user.token })
  );

  // -------------
  // RENDER
  // -------------

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !leadGuestData) {
    return <div>Loading...</div>;
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
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.headerText}>
                  {column.headerText}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {leadGuestData.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                    No guests to show
                </TableCell>
              </TableRow>
            )}
            {leadGuestData.data.length > 0 &&
                leadGuestData.data.map((leadGuest) => (
                  <TableRow key={leadGuest.id}>
                    {columns.map((column) => (
                      <TableCell key={column.headerText}>
                        {leadGuest[column.dataField] as string}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>  
      </TableContainer>
    </div>
  );
};

export default Guests;
