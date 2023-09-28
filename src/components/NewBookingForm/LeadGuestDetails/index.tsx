import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { NEW_OR_EXISTING } from "../../../settings";
import SearchField from "../../SearchField";
import "./style.css";
import { LeadGuest } from "../../../types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';  
import { set } from "date-fns";

type LeadGuestDetailsProps = {
  formGuestType: string;
  setFormGuestType: Dispatch<SetStateAction<"new" | "existing">>;
  formGuestId: number | null;
  setFormGuestId: Dispatch<SetStateAction<number | null>>;
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
  formGuestCountry: string;
  setFormGuestCountry: Dispatch<SetStateAction<string>>;
  callbackFromSearchField: (data: any) => void;
  searchFieldResults: any;
};

const LeadGuestDetails = ({
  formGuestType,
  setFormGuestType,
  formGuestId,
  setFormGuestId,
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
  formGuestCountry,
  setFormGuestCountry,
  callbackFromSearchField,
  searchFieldResults,
}: LeadGuestDetailsProps) => {

  function handleFormGuestTypeChange(value: "new" | "existing") {
    if (value === "new") {
      setFormGuestType("new");
      setFormGuestId(null);
    } else {
      setFormGuestType("existing");
    }
  }

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
          <ToggleButton value={NEW_OR_EXISTING.NEW}>New Guest</ToggleButton>
          <ToggleButton value={NEW_OR_EXISTING.EXISTING}>
            Existing Guest
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {formGuestType === NEW_OR_EXISTING.NEW && (
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
              required
            />
          </div>
          <div id="comm-section">
            <TextField
              label="Email"
              value={formGuestEmail}
              onChange={(event) => setFormGuestEmail(event.target.value)}
              required
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
              required
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
              required
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
              required
            />
            <TextField
              label="Country"
              value={formGuestCountry}
              onChange={(event) => setFormGuestCountry(event.target.value)}
              required
            />
          </div>
        </div>
      )}
      {formGuestType === NEW_OR_EXISTING.EXISTING && (
        <Box id="existing-guest-form">
          <Box>
            <SearchField
              callback={callbackFromSearchField}
              variant="onLight"
              trigger="CHANGE"
            />
          </Box>
          <List id="existing-guest-form-results-list">
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
            {searchFieldResults &&
              searchFieldResults.map((guest: LeadGuest) => (
                <ListItem
                  alignItems="flex-start"
                  key={guest.id}
                  secondaryAction={
                    formGuestId === guest.id && <CheckCircleIcon color={'success'} />
                  }
                >
                  <ListItemButton
                    selected={formGuestId === guest.id}
                    onClick={() => setFormGuestId(guest.id)}
                  >
                    <ListItemText
                      primary={guest.firstName + " " + guest.lastName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {guest.address1 + ", "}
                            {guest.address2 ? guest.address2 + ", " : ""}
                            {guest.townCity + ", "}
                            {guest.postcode} — {guest.email}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default LeadGuestDetails;
