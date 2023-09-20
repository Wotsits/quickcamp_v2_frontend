import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Guest } from "../../types";
import { getGuests } from "../../services/queries/getGuests";
import DataTable from "../../components/DataTable";
import { Typography } from "@mui/material";
import AuthContext from "../../contexts/authContext";

const columnSpec = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Surname", width: 130 },
  { field: "address1", headerName: "Address Line 1", width: 90 },
  { field: "address2", headerName: "Address Line 2", width: 160 },
  { field: "townCity", headerName: "Town/City", width: 160 },
  { field: "postcode", headerName: "Postcode", width: 90 },
  { field: "tel", headerName: "Tel", width: 90 },
  { field: "email", headerName: "Email", width: 90 },
];

const Guests = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, isError, data, error } = useQuery<Guest[], Error>(
    ["guests"],
    () => getGuests({ token: user.token })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id="guests">
      <Typography sx={{mb:3}} variant="h5" gutterBottom>
        Guests
      </Typography>
      <DataTable rows={data!} columns={columnSpec} />
    </div>
  );
};

export default Guests;
