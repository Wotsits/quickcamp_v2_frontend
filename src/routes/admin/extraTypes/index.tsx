import React, { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
import { useQuery } from "react-query";
import { ExtraType, Site, UnitType } from "../../../types";
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
import { equipmentIcon } from "../../../settings";
import { getExtraTypes } from "../../../services/queries/getExtraTypes";
import { getUnitTypes } from "../../../services/queries/getUnitTypes";

const ExtraTypesAdmin = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // STATE
  // -------------

  const [selectedSite, setSelectedSite] = React.useState<number>(-1);
  const [selectedUnitType, setSelectedUnitType] = React.useState<number>(-1);

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading: isLoadingExtraTypes,
    isError: isErrorExtraTypes,
    data: dataExtraTypes,
    error: errorExtraTypes,
  } = useQuery<{data: ExtraType[]}, Error>(
    [
      "ExtraTypes",
      { siteId: undefined, includeUnitTypes: true, includeSite: false },
    ],
    () =>
      getExtraTypes({
        token: user.token,
        includeUnitTypes: true,
        includeSite: false,
      })
  );

  const {
    isLoading: isLoadingUnitTypes,
    isError: isErrorUnitTypes,
    data: dataUnitTypes,
    error: errorUnitTypes,
  } = useQuery<{data: UnitType[]}, Error>(
    ["UnitTypes", { includeSite: false, includeUnits: false }],
    () =>
      getUnitTypes({
        token: user.token,
        includeSite: false,
        includeUnits: false,
      })
  );

  // -------------
  // HELPERS
  // -------------

  function renderExtraTypesToTable() {
    if (!dataExtraTypes || !dataUnitTypes) return null;

    // no filters applied, render all
    if (selectedSite === -1 && selectedUnitType === -1) {
      if (dataExtraTypes.data.length === 0) {
        return (
          <TableRow>
            <TableCell colSpan={100}>No Extra Types</TableCell>
          </TableRow>
        );
      }
      return dataExtraTypes.data.map((extraType: ExtraType) => {
        const { id, name, description, icon: iconName } = extraType;
        const icon = equipmentIcon[iconName];
        return (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>
              {icon !== undefined
                ? icon({ className: "unit-type-icon" })
                : null}
            </TableCell>
          </TableRow>
        );
      });
    }

    // filters applied, render filtered

    let filteredData = [...dataExtraTypes.data];

    if (selectedSite !== -1) {
      filteredData = filteredData.filter((extraType: ExtraType) => {
        const sampleUnitType = extraType.unitTypes![0];
        return sampleUnitType.siteId === selectedSite;
      });
    }

    if (selectedUnitType !== -1) {
      filteredData = filteredData.filter((extraType: ExtraType) => {
        const unitTypes = extraType.unitTypes!.map(
          (unitType: UnitType) => unitType.id
        );
        return unitTypes.includes(selectedUnitType);
      });
    }

    if (filteredData.length === 0) {
      return (
        <TableRow>
          <TableCell>No Extra Types for this Site and Unit Type</TableCell>
        </TableRow>
      );
    }

    return filteredData.map((extraType: ExtraType) => {
      const { id, name, description, icon: iconName } = extraType;
      const icon = equipmentIcon[iconName];
      return (
        <TableRow key={id}>
          <TableCell>{id}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{description}</TableCell>
          <TableCell>
            {icon !== undefined ? icon({ className: "unit-type-icon" }) : null}
          </TableCell>
        </TableRow>
      );
    });
  }

  // -------------
  // RENDER
  // -------------

  if (isLoadingExtraTypes || isLoadingUnitTypes) return <div>Loading...</div>;
  if (isErrorExtraTypes || isErrorUnitTypes)
    return (
      <>
        {isErrorExtraTypes && <div>{errorExtraTypes.message}</div>}
        {isErrorUnitTypes && <div>{errorUnitTypes.message}</div>}
      </>
    );

  return (
    <div id="extra-types-admin" className="full-width">
      {/* PAGE HEADER */}

      <PageHeader title="Extra Types">
        <IconButton onClick={() => console.log("Add Unit Type")} size="large">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

      {/* FILTERS */}

      <div
        id="extra-types-filters"
        className="container-white-bg-rounded-full-width margin-bottom-1"
      >
        <div className="container-flex-row-space-between-center-full-width">
          <FormControl fullWidth>
            <InputLabel id="site-select">Filter by Site</InputLabel>
            <Select
              labelId="site-select"
              id="site-select"
              value={selectedSite}
              label="Unit Type Filter"
              onChange={(e) => setSelectedSite(e.target.value as number)}
            >
              <MenuItem value={-1}>All Sites</MenuItem>
              {user.sites.map((site: Site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
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
              onChange={(e) => setSelectedUnitType(e.target.value as number)}
            >
              <MenuItem value={-1}>All Unit Types</MenuItem>
              {dataUnitTypes!.data.map((unitType: UnitType) => (
                <MenuItem key={unitType.id} value={unitType.id}>
                  {unitType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

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
          <TableBody>{renderExtraTypesToTable()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExtraTypesAdmin;
