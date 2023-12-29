import React, { useContext, useEffect, useState } from "react";
import SearchField from "../../../atoms/SearchField";
import { LeadGuest } from "../../../../types";
import SearchResultsItem from "../../../molecules/SearchResultsItem";
import {
  Alert,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AuthContext from "../../../../contexts/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLeadGuestsByQueryString } from "../../../../services/queries/getLeadGuestsByQueryString";
import { updateBookingLeadGuestExisting } from "../../../../services/mutations/updateBookingLeadGuestExisting";
import { updateBookingLeadGuestNew } from "../../../../services/mutations/updateBookingLeadGuestNew";
import "./style.css";
import { NEW_OR_EXISTING } from "../../../../settings";

type EditLeadGuestFormProps = {
  currentLeadGuestIn: LeadGuest;
  bookingId: number;
};

const EditLeadGuestForm = ({
  currentLeadGuestIn,
  bookingId,
}: EditLeadGuestFormProps) => {
  // -------------
  // HOOKS
  // -------------

  const queryClient = useQueryClient();

  // -------------
  // CONTEXT
  // -------------

  const { user, selectedSite } = useContext(AuthContext);

  // -------------
  // STATE
  // -------------

  const [currentLeadGuest, setCurrentLeadGuest] =
    useState<LeadGuest>(currentLeadGuestIn);
  const [guestType, setGuestType] = useState<string>(NEW_OR_EXISTING.EXISTING);
  const [searchFieldValue, setSearchFieldValue] = useState<string>("");
  const [debouncedGuestSearchFieldValue, setDebouncedGuestSearchFieldValue] =
    useState<string>("");
  const [selectedLeadGuestId, setSelectedLeadGuestId] = useState<
    number | undefined
  >(currentLeadGuest.id);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [formGuestFirstName, setFormGuestFirstName] = useState<string>("");
  const [formGuestLastName, setFormGuestLastName] = useState<string>("");
  const [formGuestEmail, setFormGuestEmail] = useState<string>("");
  const [formGuestTel, setFormGuestTel] = useState<string>("");
  const [formGuestAddress1, setFormGuestAddress1] = useState<string>("");
  const [formGuestAddress2, setFormGuestAddress2] = useState<string>("");
  const [formGuestCity, setFormGuestCity] = useState<string>("");
  const [formGuestCounty, setFormGuestCounty] = useState<string>("");
  const [formGuestPostcode, setFormGuestPostcode] = useState<string>("");
  const [formGuestCountry, setFormGuestCountry] = useState<string>("");

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading: existingGuestSearchResultsAreLoading,
    isError: existingGuestSearchResultsAreError,
    data: existingGuestSearchResultsData,
    error: existingGuestSearchResultsError,
  } = useQuery<{ data: LeadGuest[] }, Error>(
    ["getGuestsByQueryString", user.tenantId, debouncedGuestSearchFieldValue],
    () =>
      getLeadGuestsByQueryString({
        q: debouncedGuestSearchFieldValue,
        token: user.token,
      }),
    {
      enabled: debouncedGuestSearchFieldValue.length > 3,
    }
  );

  // -------------
  // MUTATIONS
  // -------------

  const existingLeadGuest = useMutation({
    mutationFn: () =>
      updateBookingLeadGuestExisting({
        token: user.token,
        bookingId: bookingId,
        leadGuestId: selectedLeadGuestId as number,
      }),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["booking", bookingId],
      });
      setCurrentLeadGuest(res.data.leadGuest);
      setSuccessMessage("Lead guest updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    },
    onError: (err: any) => {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    },
  });

  const newLeadGuest = useMutation({
    mutationFn: () =>
      updateBookingLeadGuestNew({
        token: user.token,
        bookingId: bookingId,
        firstName: formGuestFirstName,
        lastName: formGuestLastName,
        email: formGuestEmail,
        tel: formGuestTel,
        address1: formGuestAddress1,
        address2: formGuestAddress2,
        townCity: formGuestCity,
        county: formGuestCounty,
        postcode: formGuestPostcode,
        country: formGuestCountry,
      }),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["booking", bookingId],
      });
      setCurrentLeadGuest(res.data.leadGuest);
      setSelectedLeadGuestId(res.data.leadGuest.id);
      setSuccessMessage("Lead guest updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    },
    onError: (err: any) => {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    },
  });

  // -------------
  // USEEFFECTS
  // -------------

  // debounce the search field
  useEffect(() => {
    // if the search field is empty, reset the debounced search field
    if (!searchFieldValue) {
      setDebouncedGuestSearchFieldValue("");
    }

    // otherwise, set a timeout to update the debounced search field
    const timeoutId = setTimeout(() => {
      setDebouncedGuestSearchFieldValue(searchFieldValue);
    }, 1000);

    // clear the timeout if the search field content changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchFieldValue]);

  // if the selected lead guest id is different to the current lead guest id, set isChanged to true
  /* 
    Explanation of logic here:
    When the component mounts, isChanged is set to false.
    When the selected Id changes for the first time, isChanged is set to true.
    isChanged is never changed again.  
    From that point onwards, all selections result in a mutation.
  */
  useEffect(() => {
    if (selectedLeadGuestId !== currentLeadGuest.id) {
      setIsChanged(true);
    }
  }, [selectedLeadGuestId]);

  // trigger the mutation function when a new lead guest is selected
  /*
    Explanation of logic here:
    The first time this happens, it is triggered by the change in isChanged.
    After that, it is triggered by the change in selectedLeadGuestId.
  */
  useEffect(() => {
    if (selectedLeadGuestId && isChanged) {
      existingLeadGuest.mutate();
    }
  }, [selectedLeadGuestId, isChanged]);

  // -------------
  // RENDER
  // -------------

  return (
    <div id="edit-lead-guest-form">
      {/* New Lead Guest Option */}

      <div id="edit-lead-guest-form-new-guest-option">
        <ToggleButtonGroup
          value={guestType}
          exclusive
          onChange={(event, value) => setGuestType(value)}
          color="primary"
        >
          <ToggleButton value={NEW_OR_EXISTING.NEW}>New Guest</ToggleButton>
          <ToggleButton value={NEW_OR_EXISTING.EXISTING}>
            Existing Guest
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {guestType === NEW_OR_EXISTING.NEW && (
        <div id="edit-lead-guest-form-new-guest-option">
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
                fullWidth
              />
              <TextField
                label="Telephone"
                value={formGuestTel}
                onChange={(event) => setFormGuestTel(event.target.value)}
                fullWidth
              />
            </div>
            <div id="address-section">
              <TextField
                label="Address 1"
                value={formGuestAddress1}
                onChange={(event) => setFormGuestAddress1(event.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Address 2"
                value={formGuestAddress2}
                onChange={(event) => setFormGuestAddress2(event.target.value)}
                fullWidth
              />
              <TextField
                label="City"
                value={formGuestCity}
                onChange={(event) => setFormGuestCity(event.target.value)}
                required
                fullWidth
              />
              <TextField
                label="County"
                value={formGuestCounty}
                onChange={(event) => setFormGuestCounty(event.target.value)}
                fullWidth
              />
              <TextField
                label="Postcode"
                value={formGuestPostcode}
                onChange={(event) => setFormGuestPostcode(event.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Country"
                value={formGuestCountry}
                onChange={(event) => setFormGuestCountry(event.target.value)}
                required
                fullWidth
              />
            </div>
            <div id="save-button-section">
              {error && <Alert severity="error">{error}</Alert>}
              {successMessage && (
                <Alert severity="success">{successMessage}</Alert>
              )}

              <Button
                variant="contained"
                onClick={() => {
                  newLeadGuest.mutate();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {guestType === NEW_OR_EXISTING.EXISTING && (
        <div id="edit-lead-guest-form-existing-guest-option">
          {/* Search Field */}

          <SearchField
            autoFocus
            callback={setSearchFieldValue}
            trigger="CHANGE"
            variant="onLight"
          />

          {/* Search Results */}

          {/* Always show the current lead guest */}

          <div id="edit-lead-guest-form-search-results">
            <SearchResultsItem
              secondaryAction={
                selectedLeadGuestId === currentLeadGuest.id && (
                  <CheckCircleIcon color={"success"} />
                )
              }
              selected={selectedLeadGuestId === currentLeadGuest.id}
              onClick={() => setSelectedLeadGuestId(currentLeadGuest.id)}
              listItemTextPrimary={
                currentLeadGuest.firstName + " " + currentLeadGuest.lastName
              }
              listItemTextSecondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {currentLeadGuest.address1 + ", "}
                    {currentLeadGuest.address2
                      ? currentLeadGuest.address2 + ", "
                      : ""}
                    {currentLeadGuest.townCity + ", "}
                    {currentLeadGuest.postcode} — {currentLeadGuest.email}
                  </Typography>
                </React.Fragment>
              }
            />

            {existingGuestSearchResultsAreLoading && (
              <div>Loading search results...</div>
            )}

            {existingGuestSearchResultsAreError && (
              <div>Error: {existingGuestSearchResultsError?.message}</div>
            )}

            {existingGuestSearchResultsData &&
              existingGuestSearchResultsData.data.length === 0 && (
                <div>No existing guests found.</div>
              )}

            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            {existingGuestSearchResultsData &&
              existingGuestSearchResultsData.data.length > 0 &&
              existingGuestSearchResultsData.data.map((guest: LeadGuest) => (
                <>
                  {guest.id !== currentLeadGuest.id && (
                    <SearchResultsItem
                      secondaryAction={
                        selectedLeadGuestId === guest.id && (
                          <CheckCircleIcon color={"success"} />
                        )
                      }
                      selected={selectedLeadGuestId === guest.id}
                      onClick={() => setSelectedLeadGuestId(guest.id)}
                      listItemTextPrimary={
                        guest.firstName + " " + guest.lastName
                      }
                      listItemTextSecondary={
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
                  )}
                </>
              ))}
          </div>
        </div>
      )}

      {/* Error */}

    </div>
  );
};

export default EditLeadGuestForm;
