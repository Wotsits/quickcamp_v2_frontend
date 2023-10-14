import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import LeadGuestDetails from "../../../components/NewBookingForm/LeadGuestDetails";
import EquipmentDetails from "../../../components/NewBookingForm/EquipmentDetails";
import BookingDetails from "../../../components/NewBookingForm/BookingDetails";
import OccupantDetails from "../../../components/NewBookingForm/OccupantDetails";
import PaymentDetails from "../../../components/NewBookingForm/PaymentDetails";
import AuthContext from "../../../contexts/authContext";
import {
  EquipmentType,
  ExtraType,
  GuestType,
  LeadGuest,
  Unit,
} from "../../../types";
import { getExtraTypesBySiteId } from "../../../services/queries/getExtraTypes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useWindowDimensions from "../../../hooks/useWindowDimension";
import { getGuestsByQueryString } from "../../../services/queries/getGuestsByQueryString";
import { NEW_OR_EXISTING } from "../../../settings";
import { useLeadGuestDetailState } from "./hooks/useLeadGuestDetailState";
import { useValidityState } from "./hooks/useValidityState";
import { useEquipmentDetailsState } from "./hooks/useEquipmentDetailsState";
import { useBookingDetailsState } from "./hooks/useBookingDetailsState";
import { useOccupantDetailsState } from "./hooks/useOccupantDetailsState";
import { usePaymentDetailsState } from "./hooks/usePaymentDetailsState";
import { getAvailableUnits } from "../../../services/queries/getAvailableUnits";
import { makeNewBooking } from "../../../services/mutations/makeNewBooking";
import BookingConfirmation from "../../../components/NewBookingForm/BookingConfirmation";

const steps = [
  "Lead Guest Details",
  "Equipment Details",
  "Booking Details",
  "Occupant Details",
  "Payment Details",
  "Making Your Booking",
  "Booking Complete",
];

const NewBooking = () => {
  // -------------
  // HOOKS
  // -------------

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { width } = useWindowDimensions();
  const unitId = searchParams.get("unitId");
  const start = searchParams.get("start");
  const queryClient = useQueryClient();

  // -------------
  // CONTEXT
  // -------------

  const { user, selectedSite } = useContext(AuthContext);

  // -------------
  // STATE
  // -------------

  const [activeStep, setActiveStep] = useState<number>(0);
  const [bookingId, setBookingId] = useState<number>(-1);

  // Validity
  const {
    isSectionOneValid,
    setIsSectionOneValid,
    isSectionTwoValid,
    setIsSectionTwoValid,
    isSectionThreeValid,
    setIsSectionThreeValid,
    isSectionFourValid,
    setIsSectionFourValid,
    isSectionFiveValid,
    setIsSectionFiveValid,
  } = useValidityState();

  // LeadGuest Details
  const {
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
    formGuestTel,
    setFormGuestTel,
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
    formGuestSearchFieldContent,
    setFormGuestSearchFieldContent,
    debouncedGuestSearchFieldContent,
    setDebouncedGuestSearchFieldContent,
  } = useLeadGuestDetailState();

  // Equipment Details
  const { formEquipmentType, setFormEquipmentType, formExtras, setFormExtras } =
    useEquipmentDetailsState();

  // Booking Details
  const {
    formUnitId,
    setFormUnitId,
    formStartDate,
    setFormStartDate,
    formEndDate,
    setFormEndDate,
  } = useBookingDetailsState({
    requestedUnitId: unitId ? parseInt(unitId) : null,
    requestedStartDate: start ? new Date(start) : null,
  });

  // Occupant Details
  const {
    formBookingGuests,
    setFormBookingGuests,
    formBookingPets,
    setFormBookingPets,
    formBookingVehicles,
    setFormBookingVehicles,
  } = useOccupantDetailsState();

  // Payment Details
  const {
    formPaymentAmount,
    setFormPaymentAmount,
    formPaymentMethod,
    setFormPaymentMethod,
    formPaymentDate,
    setFormPaymentDate,
  } = usePaymentDetailsState();

  // -------------
  // QUERIES
  // -------------

  const {
    isLoading: extraTypesAreLoading,
    isError: extraTypesAreError,
    data: extraTypesData,
    error: extraTypesError,
  } = useQuery<ExtraType[], Error>(["extraTypes", selectedSite?.id], () =>
    getExtraTypesBySiteId({ token: user.token, siteId: selectedSite!.id })
  );

  // -------------

  const {
    isLoading: existingGuestSearchResultsAreLoading,
    isError: existingGuestSearchResultsAreError,
    data: existingGuestSearchResultsData,
    error: existingGuestSearchResultsError,
  } = useQuery<LeadGuest[], Error>(
    ["getGuestsByQueryString", user.tenantId, debouncedGuestSearchFieldContent],
    () =>
      getGuestsByQueryString({
        q: debouncedGuestSearchFieldContent,
        token: user.token,
      }),
    {
      enabled: debouncedGuestSearchFieldContent.length > 3,
    }
  );

  // -------------

  const {
    isLoading: availableUnitsAreLoading,
    isError: availableUnitsAreError,
    data: availableUnitsData,
    error: availableUnitsError,
  } = useQuery<Unit[], Error>(
    ["getAvailableUnits", user.tenantId, formStartDate, formEndDate],
    () =>
      getAvailableUnits({
        token: user.token,
        startDate: formStartDate!,
        endDate: formEndDate!,
        siteId: selectedSite!.id,
        equipmentTypeId: formEquipmentType,
      }),
    {
      enabled: formStartDate !== null && formEndDate !== null,
    }
  );

  // -------------
  // MUTATIONS
  // -------------

  const mutation = useMutation({
    mutationFn: () =>
      makeNewBooking({
        token: user.token,
        siteId: selectedSite!.id,
        leadGuestId: formGuestId!,
        leadGuestFirstName: formGuestFirstName,
        leadGuestLastName: formGuestLastName,
        leadGuestEmail: formGuestEmail,
        leadGuestTel: formGuestTel,
        leadGuestAddress1: formGuestAddress1,
        leadGuestAddress2: formGuestAddress2,
        leadGuestCity: formGuestCity,
        leadGuestCounty: formGuestCounty,
        leadGuestPostcode: formGuestPostcode,
        leadGuestCountry: formGuestCountry,
        equipmentTypeId: formEquipmentType!,
        unitId: formUnitId!,
        startDate: formStartDate!,
        endDate: formEndDate!,
        extras: formExtras,
        bookingGuests: formBookingGuests,
        bookingPets: formBookingPets,
        bookingVehicles: formBookingVehicles,
        paymentAmount: formPaymentAmount,
        paymentMethod: formPaymentMethod,
        paymentDate: formPaymentDate!,
      }),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["units"] });
      setBookingId(res.data.data.id);
      setActiveStep(6);
    },
  });

  // -------------
  // USEEFFECTS
  // -------------

  // debounce the search field
  useEffect(() => {
    // if the search field is empty, reset the debounced search field
    if (!formGuestSearchFieldContent) {
      setDebouncedGuestSearchFieldContent("");
    }

    // otherwise, set a timeout to update the debounced search field
    const timeoutId = setTimeout(() => {
      setDebouncedGuestSearchFieldContent(formGuestSearchFieldContent);
    }, 1000);

    // clear the timeout if the search field content changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [formGuestSearchFieldContent]);

  // ----------------

  useEffect(() => {
    if (formGuestType === NEW_OR_EXISTING.EXISTING) {
      setIsSectionOneValid(formGuestId !== null);
      return;
    }

    const requiredFields = [
      formGuestLastName,
      formGuestEmail,
      formGuestAddress1,
      formGuestCity,
      formGuestCountry,
      formGuestPostcode,
    ];

    const allFieldsAreValid = requiredFields.every((field) => {
      return field !== null && field !== "";
    });

    setIsSectionOneValid(allFieldsAreValid);
  }, [
    formGuestType,
    formGuestId,
    formGuestLastName,
    formGuestEmail,
    formGuestAddress1,
    formGuestCity,
    formGuestCountry,
    formGuestPostcode,
  ]);

  // -------------

  useEffect(() => {
    setIsSectionTwoValid(formEquipmentType !== -1);
  }, [formEquipmentType]);

  useEffect(() => {
    // check that the required fields are completed.
    if (formUnitId === null || formStartDate === null || formEndDate === null) {
      setIsSectionThreeValid(false);
      return;
    }

    // check that the start date is before the end date
    const startBeforeEnd = formStartDate < formEndDate;

    setIsSectionThreeValid(startBeforeEnd);
  }, [formUnitId, formStartDate, formEndDate]);

  // -------------

  useEffect(() => {
    const hasAtleastOneGuest = formBookingGuests.length > 0;
    const everyGuestHasName = formBookingGuests.every((guest) => {
      return guest.name !== "";
    });
    const everyGuestHasType = formBookingGuests.every((guest) => {
      return guest.guestTypeId !== -1;
    });
    const everyPetHasName = formBookingPets.every((pet) => {
      return pet.name !== "";
    });
    const everyVehicleHasVehicleReg = formBookingVehicles.every((vehicle) => {
      return vehicle.vehicleReg !== "";
    });
    setIsSectionFourValid(
      hasAtleastOneGuest &&
        everyGuestHasName &&
        everyGuestHasType &&
        everyPetHasName &&
        everyVehicleHasVehicleReg
    );
  }, [formBookingGuests, formBookingPets, formBookingVehicles]);

  // -------------
  // EVENT HANDLERS
  // -------------

  function handleSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    // check that all sections are valid before submitting
    if (
      !isSectionOneValid ||
      !isSectionTwoValid ||
      !isSectionThreeValid ||
      !isSectionFourValid ||
      !isSectionFiveValid
    ) {
      // raise a toast to the user
      return;
    }
    setActiveStep(5);
    mutation.mutate();
  }

  // -------------
  // HELPERS
  // -------------

  function isNextButtonDisabled() {
    switch (activeStep) {
      case 0:
        return !isSectionOneValid;
      case 1:
        return !isSectionTwoValid;
      case 2:
        return !isSectionThreeValid;
      case 3:
        return !isSectionFourValid;
      case 4:
        return !isSectionFiveValid;
      default:
        return true;
    }
  }

  // -------------
  // RENDER
  // -------------

  if (extraTypesAreLoading) {
    return <div>Loading...</div>;
  }

  if (extraTypesAreError && extraTypesError) {
    return <div>Error: {extraTypesError.message}</div>;
  }

  return (
    <div id="new-booking">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Create New Booking
      </Typography>

      {/* STEPPER on wider screens */}

      {width > 600 && (
        <Box sx={{ width: "100%", mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}

      {/* TITLE on mobile screens */}

      {width <= 600 && (
        <Box sx={{ width: "100%", mb: 4 }}>
          <Typography sx={{ mb: 3 }} variant="h6" gutterBottom>
            {steps[activeStep]}
          </Typography>
        </Box>
      )}

      {/* Form container wrapper gives form a max-width */}

      <div id="new-booking-form-container">
        <form id="new-booking-form" onSubmit={handleSubmit}>
          {/* LEAD GUEST DETAILS */}

          {activeStep === 0 && (
            <LeadGuestDetails
              formGuestType={formGuestType}
              setFormGuestType={setFormGuestType}
              formGuestId={formGuestId}
              setFormGuestId={setFormGuestId}
              formGuestFirstName={formGuestFirstName}
              setFormGuestFirstName={setFormGuestFirstName}
              formGuestLastName={formGuestLastName}
              setFormGuestLastName={setFormGuestLastName}
              formGuestEmail={formGuestEmail}
              setFormGuestEmail={setFormGuestEmail}
              formGuestTel={formGuestTel}
              setFormGuestTel={setFormGuestTel}
              formGuestAddress1={formGuestAddress1}
              setFormGuestAddress1={setFormGuestAddress1}
              formGuestAddress2={formGuestAddress2}
              setFormGuestAddress2={setFormGuestAddress2}
              formGuestCity={formGuestCity}
              setFormGuestCity={setFormGuestCity}
              formGuestCounty={formGuestCounty}
              setFormGuestCounty={setFormGuestCounty}
              formGuestPostcode={formGuestPostcode}
              setFormGuestPostcode={setFormGuestPostcode}
              formGuestCountry={formGuestCountry}
              setFormGuestCountry={setFormGuestCountry}
              callbackFromSearchField={setFormGuestSearchFieldContent}
              searchFieldResults={existingGuestSearchResultsData}
            />
          )}

          {/* EQUIPMENT DETAILS */}

          {activeStep === 1 && (
            <EquipmentDetails
              equipmentTypes={selectedSite?.equipmentTypes as EquipmentType[]}
              formEquipmentType={formEquipmentType}
              setFormEquipmentType={setFormEquipmentType}
              extraTypes={extraTypesData!}
              formExtras={formExtras}
              setFormExtras={setFormExtras}
            />
          )}

          {/* BOOKING DETAILS */}

          {activeStep === 2 && (
            <BookingDetails
              formUnitId={formUnitId}
              setFormUnitId={setFormUnitId}
              formStartDate={formStartDate}
              setFormStartDate={setFormStartDate}
              formEndDate={formEndDate}
              setFormEndDate={setFormEndDate}
              availableUnits={availableUnitsData!}
            />
          )}

          {/* OCCUPANT DETAILS */}

          {activeStep === 3 && (
            <OccupantDetails
              guestTypes={selectedSite?.guestTypes as GuestType[]}
              guests={formBookingGuests}
              setGuests={setFormBookingGuests}
              pets={formBookingPets}
              setPets={setFormBookingPets}
              vehicles={formBookingVehicles}
              setVehicles={setFormBookingVehicles}
            />
          )}

          {/* PAYMENT DETAILS */}

          {activeStep === 4 && (
            <PaymentDetails
              formPaymentAmount={formPaymentAmount}
              setFormPaymentAmount={setFormPaymentAmount}
              formPaymentMethod={formPaymentMethod}
              setFormPaymentMethod={setFormPaymentMethod}
              formPaymentDate={formPaymentDate}
              setFormPaymentDate={setFormPaymentDate}
            />
          )}

          {/* MAKING YOUR BOOKING */}

          {activeStep === 5 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1">
                Please wait while we make your booking...
              </Typography>
            </Box>
          )}

          {/* BOOKING COMPLETE */}

          {activeStep === 6 && <BookingConfirmation bookingId={bookingId} />}
          
        </form>
      </div>

      {/* STEP CONTROL BUTTONS */}

      {activeStep < 5 && (
        <Box width="100%" display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => {
              if (activeStep > 0) {
                setActiveStep(activeStep - 1);
              }
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={
              activeStep <= 3
                ? () => setActiveStep(activeStep + 1)
                : (e) => handleSubmit(e)
            }
            disabled={isNextButtonDisabled()}
          >
            {activeStep <= 3 ? "Next" : "Complete Booking"}
          </Button>
        </Box>
      )}
    </div>
  );
};

export default NewBooking;
