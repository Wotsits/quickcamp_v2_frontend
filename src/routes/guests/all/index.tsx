import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { LeadGuest } from "../../../types";
import { getLeadGuests } from "../../../services/queries/getLeadGuests";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AuthContext from "../../../contexts/authContext";
import PageHeader from "../../../components/molecules/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DEFAULT_PAGE_SIZE, ROUTES } from "../../../settings";
import TablePaginationControls from "../../../components/atoms/Table/TablePaginationControls";
import { useNavigate } from "react-router-dom";

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
  // HOOKS
  // -------------

  const navigate = useNavigate();

  // -------------
  // STATE
  // -------------

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading,
    isError,
    data: leadGuestData,
    error,
  } = useQuery<{ data: LeadGuest[]; count: number }, Error>(
    ["guests", {
      token: user.token,
      skip: page * pageSize - pageSize,
      take: pageSize,
    }],
    () =>
      getLeadGuests({
        token: user.token,
        skip: page * pageSize - pageSize,
        take: pageSize,
      })
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
    <div id="guests" className="full-width flex-column h-full">
      {/* PAGE HEADER */}

      <PageHeader title="Guests">
        <IconButton onClick={() => console.log("Add guest")} size="large">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

      {/* TABLE */}
      <div className="container-white-bg-rounded-full-width flex-grow overflow-y-auto">
        <TableContainer sx={{overflowX: "initial"}}>
          <Table stickyHeader>
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
                  <TableRow
                    key={leadGuest.id}
                    className="clickable"
                    onClick={() =>
                      navigate(ROUTES.ROOT + ROUTES.GUESTS + leadGuest.id)
                    }
                    hover
                  >
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
        <TablePaginationControls
          count={leadGuestData.count}
          page={page}
          rowsPerPage={pageSize}
          onPageChange={(_, newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default Guests;
