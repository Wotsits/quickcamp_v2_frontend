import React, { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
import { useQuery } from "react-query";
import { Site } from "../../../types";
import { getSites } from "../../../services/queries/getSites";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
} from "@mui/material";
import PageHeader from "../../../components/molecules/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ROUTES } from '../../../settings';
import { Routes, useNavigate } from "react-router-dom";

const SitesAdmin = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user, selectedSite } = useContext(AuthContext);

  // -------------
  // HOOKS
  // -------------

  const navigate = useNavigate();

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data: sitesData, error } = useQuery<{data: Site[]}, Error>(
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
    <div id="sites-admin" className="full-width">

      {/* PAGE HEADER */}

      <PageHeader title="Sites">
        <IconButton onClick={() => navigate(ROUTES.ROOT + ROUTES.ADMIN + ROUTES.SITES + ROUTES.NEW)} size="large">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>
      
      {/* TABLE */}

      <TableContainer component={Paper} className="container-white-bg-rounded-full-width margin-bottom-1">
        <Table sx={{ minWidth: 300, width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Site Name</TableCell>
              <TableCell sx={{minWidth: 600}}>Description</TableCell>
              <TableCell>Address Line 1</TableCell>
              <TableCell>Address Line 2</TableCell>
              <TableCell>Town/City</TableCell>
              <TableCell>County</TableCell>
              <TableCell>Postcode</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Tel</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sitesData?.data.map((site) => (
              <TableRow key={site.id} className="clickable" hover onClick={() => navigate(ROUTES.ROOT + ROUTES.ADMIN + ROUTES.SITES + site.id)}>
                <TableCell>{site.id}</TableCell>
                <TableCell>{site.name}</TableCell>
                <TableCell>{site.description}</TableCell>
                <TableCell>{site.address1}</TableCell>
                <TableCell>{site.address2}</TableCell>
                <TableCell>{site.townCity}</TableCell>
                <TableCell>{site.county}</TableCell>
                <TableCell>{site.postcode}</TableCell>
                <TableCell>{site.country}</TableCell>
                <TableCell>{site.latitude}</TableCell>
                <TableCell>{site.longitude}</TableCell>
                <TableCell>{site.website}</TableCell>
                <TableCell>{site.tel}</TableCell>
                <TableCell>{site.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SitesAdmin;
