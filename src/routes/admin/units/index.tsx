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

const UnitsAdmin = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // STATE
  // -------------

  const [selectedSite, setSelectedSite] = React.useState<number | null>(-1);
  const [selectedUnitType, setSelectedUnitType] = React.useState<number | null>(
    -1
  );

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data, error } = useQuery<UnitType[], Error>(
    ["UnitTypes"],
    () =>
      getUnitTypes({
        token: user.token,
        includeSite: true,
        includeUnits: true,
      })
  );

  // -------------
  // HELPERS
  // -------------

  function renderUnitsToTable() {
    if (!data) return null;

    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={100}>No units found.</TableCell>
        </TableRow>
      );
    }

    // if no filters applied

    if (selectedSite === -1 && selectedUnitType === -1) {
      return data.map((unitType: UnitType) => {
        return unitType.units!.map((unit) => {
          return (
            <TableRow
              key={unit.id}
              onClick={() => console.log("Clicked Row")}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{unit.id}</TableCell>
              <TableCell>{unit.name}</TableCell>
            </TableRow>
          );
        });
      });
    }

    // else, apply filters

    let filteredData = data;

    if (selectedUnitType !== -1) {
      filteredData = filteredData.filter(
        (unitType: UnitType) => unitType.id === selectedUnitType
      );
    }
    if (selectedSite !== -1) {
      filteredData = filteredData.filter(
        (unitType: UnitType) => unitType.siteId === selectedSite
      );
    }

    if (filteredData.length === 0) {
      return <TableRow><TableCell colSpan={100}>No units found matching applied filters.</TableCell></TableRow>;
    }

    return filteredData.map((unitType: UnitType) => {
      return unitType.units!.map((unit) => {
        return (
          <TableRow
            key={unit.id}
            onClick={() => console.log("Clicked Row")}
            sx={{ cursor: "pointer" }}
          >
            <TableCell>{unit.id}</TableCell>
            <TableCell>{unit.name}</TableCell>
          </TableRow>
        );
      });
    });
  }

  // -------------
  // RENDER
  // -------------

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div id="units-admin">
      <PageHeader title="Units">
        <IconButton onClick={() => console.log("Add Unit")} size="large">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

      <div className="full-width-container">
        <div className="units-admin-filter-container">
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
          <FormControl fullWidth>
            <InputLabel id="unit-type-select">Filter by Unit Type</InputLabel>
            <Select
              labelId="unit-type-select"
              id="unit-type-select"
              value={selectedUnitType}
              label="Unit Type Filter"
              onChange={(e) =>
                setSelectedUnitType(e.target.value as number | null)
              }
            >
              <MenuItem value={-1}>All Unit Types</MenuItem>
              {data!.map((unitType: UnitType) => (
                <MenuItem value={unitType.id}>{unitType.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table sx={{ minWidth: 300, width: "100%" }}>
          <TableHead>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableHead>
          <TableBody>{renderUnitsToTable()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UnitsAdmin;
