import React, { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
import { useQuery } from "react-query";
import { User, Site, UnitType } from "../../../types";
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
import PageHeader from "../../../components/molecules/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getUsers } from "../../../services/queries/getUsers";

const UsersAdmin = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);

  // -------------
  // STATE
  // -------------

  const [selectedRole, setSelectedRole] = React.useState<string>("");

  // -------------
  // QUERIES
  // -------------

  const { isLoading, isError, data: userData, error } = useQuery<{data: User[]}, Error>(
    ["Users"],
    () =>
      getUsers({
        token: user.token,
      })
  );

  // -------------
  // HELPERS
  // -------------

  function renderUsersToTable() {
    if (userData) {
      // no filter
      if (selectedRole === "") {
        return userData.data.map((user: User) => {
          const {id, username, name, email, roles} = user
          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{username}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{roles!.map(role => role.role).join(", ")}</TableCell>  
            </TableRow>
          );
        });
      }
      else {
        // filter by role
        const filteredUsers = userData.data.filter((user: User) => {
          const roles = user.roles!.map(role => role.role)
          return roles.includes(selectedRole)
        })
        if (filteredUsers.length === 0) {
          return (
            <TableRow>
              <TableCell>No Users with this role</TableCell>
            </TableRow>
          );
        }
        return filteredUsers.map((user: User) => {
          const {id, username, name, email, roles} = user
          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{username}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{roles!.map(role => role.role).join(", ")}</TableCell>  
            </TableRow>
          );
        });
      }
    }
  }

  // -------------
  // RENDER
  // -------------

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div id="users-admin" className="full-width">

      {/* PAGE HEADER */}

      <PageHeader title="Users">
        <IconButton onClick={() => console.log("Add User")} size="large">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </PageHeader>

      {/* FILTERS */}

      <div className="container-white-bg-rounded-full-width margin-bottom-1">
        <FormControl fullWidth>
          <InputLabel id="site-select">Filter by Role</InputLabel>
          <Select
            labelId="site-select"
            id="site-select"
            value={selectedRole}
            label="Site Filter"
            onChange={(e) => setSelectedRole(e.target.value as string)}
          >
            <MenuItem value={""}>All Roles</MenuItem>
            <MenuItem value={"ADMIN"}>Admin</MenuItem>
            <MenuItem value={"MANAGER"}>Manager</MenuItem>
            <MenuItem value={"RECEPTION"}>Recpetion</MenuItem>
            <MenuItem value={"MAINTENANCE"}>Maintenance</MenuItem>
            <MenuItem value={"HOUSEKEEPING"}>Housekeeping</MenuItem>
            <MenuItem value={"LIMITED"}>Limited Access</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} className="container-white-bg-rounded-full-width margin-bottom-1">
        <Table sx={{ minWidth: 300, width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderUsersToTable()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersAdmin;
