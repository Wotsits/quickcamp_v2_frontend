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
import PageHeader from "../../../components/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ROUTES } from '../../../settings';
import { useNavigate } from "react-router-dom";

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
            </TableRow>
          </TableHead>
          <TableBody>
            {sitesData?.data.map((site) => (
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
