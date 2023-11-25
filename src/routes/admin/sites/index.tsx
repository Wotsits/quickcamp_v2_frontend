import React, { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
import { useQuery } from "react-query";
import { Booking, Site } from "../../../types";
import { getSites } from "../../../services/queries/getSites";
import { TableContainer, Paper, Typography, Table, TableHead, TableCell, TableBody, TableRow, IconButton } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import "./style.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddCard } from "@mui/icons-material";

const SitesAdmin = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user, selectedSite } = useContext(AuthContext);

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data, error } = useQuery<Site[], Error>(
    ["Sites"],
    () =>
      getSites({
        token: user.token,
      })
  );

  // -------------
  // RENDER
  // -------------

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div id="sites-admin">
      <PageHeader title="Sites">
        <IconButton onClick={() => console.log("Add Site")} size="large">
          <AddCircleOutlineIcon fontSize="large"/>
        </IconButton>
      </PageHeader>
      <TableContainer component={Paper} sx={{width: "100%"}}>
        <Table sx={{minWidth: 300, width: "100%"}}>
          <TableHead>
            <TableCell>ID</TableCell>
            <TableCell>Site Name</TableCell>
          </TableHead>
          <TableBody>
            {data?.map((site) => (
              <TableRow key={site.id}>
                <TableCell>{site.id}</TableCell>
                <TableCell>{site.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SitesAdmin;
