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
import "./style.css";

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={3}
      >
        <ToggleButtonGroup
          value={formGuestType}
          exclusive
          onChange={(event, value) => setFormGuestType(value)}
          color="primary"
        >
          <ToggleButton value="new">New Guest</ToggleButton>
          <ToggleButton value="existing">Existing Guest</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {formGuestType === "new" && (
        <div id="new-guest-form">
          <div id="name-section">
            <TextField
              label="First Name"
              fullWidth
              value={formGuestFirstName}
              onChange={(event) => setFormGuestFirstName(event.target.value)}
            />
            <TextField
              label="Last Name"
              fullWidth
              value={formGuestLastName}
              onChange={(event) => setFormGuestLastName(event.target.value)}
            />
          </div>
          <div id="comm-section">
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
          </div>
          <div id="address-section">
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
          </div>
        </div>
      )}
      {formGuestType === "existing" && (
        <>
          <Box id="existing-guest-form">
            <SearchField callback={callbackFromSearchField} variant="onLight" trigger="CHANGE" />
          </Box>
          <List>
            {searchFieldResults && searchFieldResults.length === 0 && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop={3}
              >
                <Typography variant="body1">
                  No existing guests found.
                </Typography>
              </Box>
            )}
            {console.log(searchFieldResults)}
            {searchFieldResults && searchFieldResults.map((guest: any) => (
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={guest.firstName + ' ' + guest.lastName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {guest.address1 + ", "}{guest.address2 ? guest.address2 + ", " : ""}{guest.townCity + ", "}{guest.postcode} — {guest.email}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}

export default LeadGuestDetails;
