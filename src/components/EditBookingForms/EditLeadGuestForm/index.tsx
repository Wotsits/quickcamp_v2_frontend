import { Search } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import SearchField from "../../SearchField";
import { LeadGuest } from "../../../types";
import SearchResultsItem from "../../SearchResultsItem";
import { Alert, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AuthContext from "../../../contexts/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getGuestsByQueryString } from "../../../services/queries/getGuestsByQueryString";
import { updateBookingLeadGuest } from "../../../services/mutations/updateBookingLeadGuest";

type EditLeadGuestFormProps = {
  currentLeadGuest: LeadGuest;
  bookingId: number;
};

const EditLeadGuestForm = ({
  currentLeadGuest,
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

  const [searchFieldValue, setSearchFieldValue] = useState<string>("");
  const [debouncedGuestSearchFieldValue, setDebouncedGuestSearchFieldValue] =
    useState<string>("");
  const [selectedLeadGuestId, setSelectedLeadGuestId] = useState<
    number | undefined
  >(currentLeadGuest.id);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading: existingGuestSearchResultsAreLoading,
    isError: existingGuestSearchResultsAreError,
    data: existingGuestSearchResultsData,
    error: existingGuestSearchResultsError,
  } = useQuery<LeadGuest[], Error>(
    ["getGuestsByQueryString", user.tenantId, debouncedGuestSearchFieldValue],
    () =>
      getGuestsByQueryString({
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

  const mutation = useMutation({
    mutationFn: () =>
      updateBookingLeadGuest({
        token: user.token,
        bookingId: bookingId,
        leadGuestId: selectedLeadGuestId as number,
      }),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["booking", bookingId],
      });
    },
    onError: (err: any) => {
      setError(err.message);
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
      mutation.mutate();
    }
  }, [selectedLeadGuestId, isChanged]);

  // -------------
  // RENDER
  // -------------

  return (
    <div id="edit-lead-guest-form">
      {/* Error */}

      {error && <Alert severity="error">{error}</Alert>}

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
          existingGuestSearchResultsData.length === 0 && (
            <div>No existing guests found.</div>
          )}

        {existingGuestSearchResultsData &&
          existingGuestSearchResultsData.length > 0 &&
          existingGuestSearchResultsData.map((guest: LeadGuest) => (
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
                  listItemTextPrimary={guest.firstName + " " + guest.lastName}
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
  );
};

export default EditLeadGuestForm;
