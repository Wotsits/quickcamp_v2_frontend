import React, { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
import { useQuery } from "react-query";
import { EquipmentType, Site } from "../../../types";
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
import { getEquipmentTypes } from "../../../services/queries/getEquipmentTypes";
import { equipmentIcon } from "../../../settings";

const EquipmentTypesAdmin = () => {
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

  const { isLoading, isError, data: equipmentTypeData, error } = useQuery<{ data: EquipmentType[]}, Error>(
    ["EquipmentTypes", { siteId: undefined }],
    () =>
      getEquipmentTypes({
        token: user.token,
      })
  );

  // -------------
  // HELPERS
  // -------------

  function renderEquipmentTypesToTable() {
    if (equipmentTypeData) {
      if (selectedSite !== -1) {
        const equipmentTypesForSite = equipmentTypeData.data.filter(
          (equipmentType: EquipmentType) =>
            equipmentType.siteId === selectedSite
        );
        if (equipmentTypesForSite.length === 0) {
          return (
            <TableRow>
              <TableCell>No Equipment Types for this site</TableCell>
            </TableRow>
          );
        }
        return equipmentTypesForSite.map((equipmentType: EquipmentType) => {
          const { id, name, description, icon: iconName } = equipmentType;
          const icon = equipmentIcon[iconName];
          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell>
                {icon !== undefined
                  ? icon({ className: "equipment-type-icon" })
                  : null}
              </TableCell>
            </TableRow>
          );
        });
      }
      return equipmentTypeData.data.map((equipmentType: EquipmentType) => {
        const { id, name, description, icon: iconName } = equipmentType;
        const icon = equipmentIcon[iconName];
        return (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>
              {icon !== undefined
                ? icon({ className: "equipment-type-icon" })
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
    <div id="equipment-types-admin" className="full-width">
      {/* PAGE HEADER */}

      <PageHeader title="Equipment Types">
        <IconButton
          onClick={() => console.log("Add Equipment Type")}
          size="large"
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

      {/* FILTERS */}

      <div
        id="equipment-types-filters"
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
          <TableBody>{renderEquipmentTypesToTable()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EquipmentTypesAdmin;
