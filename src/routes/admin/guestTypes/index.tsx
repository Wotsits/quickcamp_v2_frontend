import React, { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
import { useQuery } from "react-query";
import { GuestType, Site } from "../../../types";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getGuestTypes } from "../../../services/queries/getGuestTypes";
import { occupantTypeIconMap } from "../../../settings";

const GuestTypesAdmin = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // STATE
  // -------------

  const [selectedSite, setSelectedSite] = React.useState<number | null>(-1);

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data: guestTypesData, error } = useQuery<{data: GuestType[]}, Error>(
    ["GuestTypes", { siteId: undefined }],
    () =>
      getGuestTypes({
        token: user.token,
      })
  );

  // -------------
  // HELPERS
  // -------------

  function renderGuestTypesToTable() {
    if (guestTypesData) {
      if (selectedSite !== -1) {
        const guestTypesForSite = guestTypesData.data.filter(
          (guestType: GuestType) => guestType.siteId === selectedSite
        );
        if (guestTypesForSite.length === 0) {
          return (
            <TableRow>
              <TableCell>No Guest Types for this site</TableCell>
            </TableRow>
          );
        }
        return guestTypesForSite.map((guestType: GuestType) => {
          const { id, name, description, icon: iconName } = guestType;
          const icon = occupantTypeIconMap[iconName];
          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell>
                {icon !== undefined
                  ? icon({ className: "occupant-type-icon" })
                  : null}
              </TableCell>
            </TableRow>
          );
        });
      }
      return guestTypesData.data.map((guestType: GuestType) => {
        const { id, name, description, icon: iconName } = guestType;
        const icon = occupantTypeIconMap[iconName];
        return (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>
              {icon !== undefined
                ? icon({ className: "occupant-type-icon" })
                : null}
            </TableCell>
          </TableRow>
        );
      });
    }
  }

  // -------------
  // RENDER
  // -------------

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div id="guest-types-admin" className="full-width">
      {/* PAGE HEADER */}

      <PageHeader title="Guest Types">
        <IconButton onClick={() => console.log("Add Guest Type")} size="large">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

      {/* FILTERS */}

      <div
        id="guest-type-filters"
        className="container-white-bg-rounded-full-width margin-bottom-1"
      >
        <FormControl fullWidth>
          <InputLabel id="site-select">Filter by Site</InputLabel>
          <Select
            labelId="site-select"
            id="site-select"
            value={selectedSite}
            label="Site Filter"
            onChange={(e) => setSelectedSite(e.target.value as number | null)}
          >
            <MenuItem value={-1}>All Sites</MenuItem>
            {user.sites.map((site: Site) => (
              <MenuItem key={site.id} value={site.id}>
                {site.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* TABLE */}

      <TableContainer
        component={Paper}
        className="container-white-bg-rounded-full-width margin-bottom-1"
      >
        <Table sx={{ minWidth: 300, width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Icon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderGuestTypesToTable()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GuestTypesAdmin;
