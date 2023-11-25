import React, { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
import { useQuery } from "react-query";
import { Site, UnitType } from "../../../types";
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
import "./style.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getUnitTypes } from "../../../services/queries/getUnitTypes";

const UnitTypesAdmin = () => {
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

  const { isLoading, isError, data, error } = useQuery<UnitType[], Error>(
    ["UnitTypes", {includeSite: false, includeUnits: false}],
    () =>
      getUnitTypes({
        token: user.token,
      })
  );

  // -------------
  // HELPERS
  // -------------

  function renderUnitTypesToTable() {
    if (data) {
      if (selectedSite !== -1) {
        const unitTypesForSite = data.filter(
          (unitType: UnitType) => unitType.siteId === selectedSite
        );
        if (unitTypesForSite.length === 0) {
          return (
            <TableRow>
              <TableCell>No Unit Types for this site</TableCell>
            </TableRow>
          );
        }
        return unitTypesForSite.map((unitType: UnitType) => (
          <TableRow key={unitType.id}>
            <TableCell>{unitType.id}</TableCell>
            <TableCell>{unitType.name}</TableCell>
            <TableCell>{unitType.description}</TableCell>
          </TableRow>
        ));
      }
      return data.map((unitType: UnitType) => (
        <TableRow key={unitType.id}>
          <TableCell>{unitType.id}</TableCell>
          <TableCell>{unitType.name}</TableCell>
          <TableCell>{unitType.description}</TableCell>
        </TableRow>
      ));
    }
  }

  // -------------
  // RENDER
  // -------------

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div id="unit-types-admin">
      <PageHeader title="UnitTypes">
        <IconButton onClick={() => console.log("Add Unit Type")} size="large">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>
      <div className="full-width-container">
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
              <MenuItem value={site.id}>{site.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table sx={{ minWidth: 300, width: "100%" }}>
          <TableHead>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableHead>
          <TableBody>{renderUnitTypesToTable()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UnitTypesAdmin;
