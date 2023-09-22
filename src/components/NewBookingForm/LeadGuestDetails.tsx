import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import SearchField from "../SearchField";

type LeadGuestDetailsProps = {
  formGuestType: string;
  setFormGuestType: Dispatch<SetStateAction<"new" | "existing">>;
  formGuestFirstName: string;
  setFormGuestFirstName: Dispatch<SetStateAction<string>>;
  formGuestLastName: string;
  setFormGuestLastName: Dispatch<SetStateAction<string>>;
  formGuestEmail: string;
  setFormGuestEmail: Dispatch<SetStateAction<string>>;
  formGuestPhone: string;
  setFormGuestPhone: Dispatch<SetStateAction<string>>;
  formGuestAddress1: string;
  setFormGuestAddress1: Dispatch<SetStateAction<string>>;
  formGuestAddress2: string;
  setFormGuestAddress2: Dispatch<SetStateAction<string>>;
  formGuestCity: string;
  setFormGuestCity: Dispatch<SetStateAction<string>>;
  formGuestCounty: string;
  setFormGuestCounty: Dispatch<SetStateAction<string>>;
  formGuestPostcode: string;
  setFormGuestPostcode: Dispatch<SetStateAction<string>>;
  callbackFromSearchField: (data: any) => void;
  searchFieldResults: any;
};

const LeadGuestDetails = ({
  formGuestType,
  setFormGuestType,
  formGuestFirstName,
  setFormGuestFirstName,
  formGuestLastName,
  setFormGuestLastName,
  formGuestEmail,
  setFormGuestEmail,
  formGuestPhone,
  setFormGuestPhone,
  formGuestAddress1,
  setFormGuestAddress1,
  formGuestAddress2,
  setFormGuestAddress2,
  formGuestCity,
  setFormGuestCity,
  formGuestCounty,
  setFormGuestCounty,
  formGuestPostcode,
  setFormGuestPostcode,
    callbackFromSearchField,
    searchFieldResults,
}: LeadGuestDetailsProps) => {
  return (
    <Box id="formGuest-details">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Guest Details
      </Typography>
      <ToggleButtonGroup
        value={formGuestType}
        exclusive
        onChange={(event, value) => setFormGuestType(value)}
        color="primary"
        sx={{ mb: 3 }}
      >
        <ToggleButton value="new">New Guest</ToggleButton>
        <ToggleButton value="existing">Existing Guest</ToggleButton>
      </ToggleButtonGroup>
      {formGuestType === "new" && (
        <Box id="new-guest-form">
          <Grid container spacing={2}>
            <TextField
              label="First Name"
              value={formGuestFirstName}
              onChange={(event) => setFormGuestFirstName(event.target.value)}
            />
            <TextField
              label="Last Name"
              value={formGuestLastName}
              onChange={(event) => setFormGuestLastName(event.target.value)}
            />
          </Grid>
          <Grid container spacing={2}>
            <TextField
              label="Email"
              value={formGuestEmail}
              onChange={(event) => setFormGuestEmail(event.target.value)}
            />
            <TextField
              label="Phone"
              value={formGuestPhone}
              onChange={(event) => setFormGuestPhone(event.target.value)}
            />
          </Grid>
          <Grid container spacing={2}>
            <TextField
              label="Address 1"
              value={formGuestAddress1}
              onChange={(event) => setFormGuestAddress1(event.target.value)}
            />
            <TextField
              label="Address 2"
              value={formGuestAddress2}
              onChange={(event) => setFormGuestAddress2(event.target.value)}
            />
            <TextField
              label="City"
              value={formGuestCity}
              onChange={(event) => setFormGuestCity(event.target.value)}
            />
            <TextField
              label="County"
              value={formGuestCounty}
              onChange={(event) => setFormGuestCounty(event.target.value)}
            />
            <TextField
              label="Postcode"
              value={formGuestPostcode}
              onChange={(event) => setFormGuestPostcode(event.target.value)}
            />
          </Grid>
        </Box>
      )}
      {formGuestType === "existing" && (
        <>
          <Box id="existing-guest-form">
            <SearchField
              callback={callbackFromSearchField}
              variant="onLight"
            />
          </Box>
          {searchFieldResults && (
            <List>
              {searchFieldResults.map((guest: any) => (
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Guest Name"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Guest Address — guest email
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </Box>
  );
};
export default LeadGuestDetails;
