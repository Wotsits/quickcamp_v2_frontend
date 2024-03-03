import {
  Alert,
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import LeadGuestDetails from "../../../components/organisms/NewBookingForm/LeadGuestDetails";
import EquipmentDetails from "../../../components/organisms/NewBookingForm/EquipmentDetails";
import BookingDetails from "../../../components/organisms/NewBookingForm/BookingDetails";
import PaymentDetails from "../../../components/organisms/NewBookingForm/PaymentDetails";
import AuthContext from "../../../contexts/authContext";
import {
  EquipmentType,
  ExtraType,
  FeeCalcResponse,
  GuestType,
  LeadGuest,
  Unit,
} from "../../../types";
import { getExtraTypes } from "../../../services/queries/getExtraTypes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useWindowDimensions from "../../../hooks/useWindowDimension";
import { getLeadGuestsByQueryString } from "../../../services/queries/getLeadGuestsByQueryString";
import { NEW_OR_EXISTING } from "../../../settings";
import { useLeadGuestDetailState } from "./hooks/useLeadGuestDetailState";
import { useValidityState } from "./hooks/useValidityState";
import { useEquipmentDetailsState } from "./hooks/useEquipmentDetailsState";
import { useBookingDetailsState } from "./hooks/useBookingDetailsState";
import { usePaymentDetailsState } from "./hooks/usePaymentDetailsState";
import { getAvailableUnits } from "../../../services/queries/getAvailableUnits";
import { makeNewBooking } from "../../../services/mutations/makeNewBooking";
import BookingConfirmation from "../../../components/organisms/NewBookingForm/BookingConfirmation";
import { getFeeCalc } from "../../../services/queries/getFeeCalc";
import PageHeader from "../../../components/molecules/PageHeader";

import SitesContext from "../../../contexts/sitesContext";

const steps = [
  "Lead Guest Details",
  "Equipment Details",
  "Booking Details",
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
  const requestedUnitId = searchParams.get("unitId");
  const requestedUnitTypeId = searchParams.get("unitTypeId");
  const start = searchParams.get("start");
  const queryClient = useQueryClient();

  // -------------
  // CONTEXT
  // -------------

  const { user } = useContext(AuthContext);
  const { selectedSite } = useContext(SitesContext);

  // -------------
  // STATE
  // -------------

  const [activeStep, setActiveStep] = useState<number>(0);
  const [bookingId, setBookingId] = useState<number>(-1);
  const [bookingFee, setBookingFee] = useState<number | null>(null);
  const [fireFeeCalc, setFireFeeCalc] = useState<boolean>(false);
  const [createBookingError, setCreateBookingError] = useState<string>("");
  const contentRef = React.useRef<HTMLDivElement>(null);

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
    formUnitTypeId,
    setFormUnitTypeId,
    formStartDate,
    setFormStartDate,
    formEndDate,
    setFormEndDate,
    dateError,
    formBookingGuests,
    setFormBookingGuests,
    formBookingPets,
    setFormBookingPets,
    formBookingVehicles,
    setFormBookingVehicles,
  } = useBookingDetailsState({
    requestedUnitTypeId: requestedUnitTypeId
      ? parseInt(requestedUnitTypeId)
      : null,
    requestedStartDate: start ? new Date(start) : null,
  });

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
  } = useQuery<{data: ExtraType[]}, Error>(["extraTypes", selectedSite?.id], () =>
    getExtraTypes({ token: user.token, siteId: selectedSite!.id })
  );

  // -------------

  const {
    isLoading: existingGuestSearchResultsAreLoading,
    isError: existingGuestSearchResultsAreError,
    data: existingGuestSearchResultsData,
    error: existingGuestSearchResultsError,
  } = useQuery<{data: LeadGuest[]}, Error>(
    ["getGuestsByQueryString", user.tenantId, debouncedGuestSearchFieldContent],
    () =>
      getLeadGuestsByQueryString({
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
  } = useQuery<{data: Unit[]}, Error>(
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
      enabled:
        formStartDate !== null &&
        formEndDate !== null &&
        formEquipmentType !== -1,
      onSuccess: (availableUnitsData) => {
        // if there are no available pitches, set the form unit id to null and return
        if (availableUnitsData.data.length === 0 || availableUnitsData.data === null) {
          setFormUnitId(null);
          setFormUnitTypeId(null);
          return;
        }

        // if no unit has already beed selected...
        if (!formUnitId) {
          // if there's a requestedUnitId in the url, select it if it's in the list of available units and return.
          if (requestedUnitId) {
            // check if the requested unit is in the returned data
            const unit = availableUnitsData.data.find(
              (unit) => unit.id === parseInt(requestedUnitId)
            );
            // if it is, set the form unit id to the requested unit id
            if (unit) {
              if (unit.id === formUnitId) return;
              setFormUnitId(parseInt(requestedUnitId));
              setFormUnitTypeId(parseInt(requestedUnitTypeId!));
              return;
            }
          } else {
            const firstUnit = availableUnitsData.data[0];
            setFormUnitId(firstUnit.id);
            setFormUnitTypeId(firstUnit.unitTypeId);
          }
        }
        // otherwise, if a unit has already been selected...
        else {
          const unit = availableUnitsData.data.find((unit) => unit.id === formUnitId);
          // if the already selected unit is in the new list of available units, do nothing.
          if (unit) return;
          // If it's not in the list of available units, select the first unit in the returned data
          else {
            const firstUnit = availableUnitsData.data[0];
            setFormUnitId(firstUnit.id);
            setFormUnitTypeId(firstUnit.unitTypeId);
          }
        }
      },
    }
  );

  // -------------

  const feeCalcReturn = useQuery<{data: FeeCalcResponse}, Error>(
    ["feeCalc", selectedSite?.id],
    () =>
      getFeeCalc({
        token: user.token,
        unitTypeId: formUnitTypeId!,
        startDate: formStartDate!,
        endDate: formEndDate!,
        extras: formExtras,
        bookingGuests: formBookingGuests,
        bookingPets: formBookingPets,
        bookingVehicles: formBookingVehicles,
      }),
    {
      enabled: fireFeeCalc,
      onSuccess: (res) => {
        if (res.data.status === "SUCCESS") {
          const fee = res.data.totalFee;
          setBookingFee(fee);
          setFormPaymentAmount(fee);
        }
      },
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
      queryClient.invalidateQueries({
        queryKey: ["arrivalsByDate"],
      });
      queryClient.invalidateQueries({ queryKey: ["units"] });
      setBookingId(res.data.data.id);
      setActiveStep(5);
    },
    onError: (err: any) => {
      setCreateBookingError(
        err.response.data.message || err.message || "An error occurred"
      );
    },
  });

  // -------------
  // USEEFFECTS
  // -------------

  // each time the step changes, reset the scroll on the content container.
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [activeStep]);

  // -------------

  // if the booking guest start and ends are changed and they fall within the booking start and end dates, update the booking start and end dates
  useEffect(() => {
    if (formBookingGuests.length === 0) return;
    const earliestStart = formBookingGuests.reduce((a, b) => {
      return a.start! < b.start! ? a : b;
    });
    const latestEnd = formBookingGuests.reduce((a, b) => {
      return a.end! > b.end! ? a : b;
    });
    setFormStartDate(earliestStart.start);
    setFormEndDate(latestEnd.end);
  }, [formBookingGuests]);

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

  // -------------

  useEffect(() => {
    // check that the required fields are completed.
    if (formUnitId === null || formStartDate === null || formEndDate === null) {
      return setIsSectionThreeValid(false);
    }

    // check that the start date is before the end date
    const startBeforeEnd = formStartDate < formEndDate;
    if (!startBeforeEnd) return setIsSectionThreeValid(false);

    // check guest details are valid
    const hasAtleastOneGuest = formBookingGuests.length > 0;
    if (!hasAtleastOneGuest) return setIsSectionThreeValid(false);
    const everyGuestHasName = formBookingGuests.every((guest) => {
      return guest.name !== "";
    });
    if (!everyGuestHasName) return setIsSectionThreeValid(false);
    const everyGuestHasType = formBookingGuests.every((guest) => {
      return guest.guestTypeId !== -1;
    });
    if (!everyGuestHasType) return setIsSectionThreeValid(false);
    const everyPetHasName = formBookingPets.every((pet) => {
      return pet.name !== "";
    });
    if (!everyPetHasName) return setIsSectionThreeValid(false);
    const everyVehicleHasVehicleReg = formBookingVehicles.every((vehicle) => {
      return vehicle.vehicleReg !== "";
    });
    if (!everyVehicleHasVehicleReg) return setIsSectionThreeValid(false);
    const everyGuestHasStartAndEndDates = formBookingGuests.every((guest) => {
      return guest.start !== null && guest.end !== null;
    });
    if (!everyGuestHasStartAndEndDates) return setIsSectionThreeValid(false);
    const everyPetHasStartAndEndDates = formBookingPets.every((pet) => {
      return pet.start !== null && pet.end !== null;
    });
    if (!everyPetHasStartAndEndDates) return setIsSectionThreeValid(false);
    const everyVehicleHasStartAndEndDates = formBookingVehicles.every(
      (vehicle) => {
        return vehicle.start !== null && vehicle.end !== null;
      }
    );
    if (!everyVehicleHasStartAndEndDates) return setIsSectionThreeValid(false);
    const everyGuestStartBeforeEnd = formBookingGuests.every((guest) => {
      return guest.start! < guest.end!;
    });
    if (!everyGuestStartBeforeEnd) return setIsSectionThreeValid(false);
    const everyPetStartBeforeEnd = formBookingPets.every((pet) => {
      return pet.start! < pet.end!;
    });
    if (!everyPetStartBeforeEnd) return setIsSectionThreeValid(false);
    const everyVehicleStartBeforeEnd = formBookingVehicles.every((vehicle) => {
      return vehicle.start! < vehicle.end!;
    });
    if (!everyVehicleStartBeforeEnd) return setIsSectionThreeValid(false);
    // if you get this far, it's all good
    return setIsSectionThreeValid(true);
  }, [
    formUnitId,
    formStartDate,
    formEndDate,
    formBookingGuests,
    formBookingPets,
    formBookingVehicles,
  ]);

  // -------------

  useEffect(() => {}, [
    formBookingGuests,
    formBookingPets,
    formBookingVehicles,
  ]);

  // -------------

  useEffect(() => {
    if (
      formPaymentAmount === null ||
      formPaymentMethod === null ||
      formPaymentDate === null
    ) {
      setIsSectionFourValid(false);
    } else {
      setIsSectionFourValid(true);
    }
  }, [formPaymentAmount, formPaymentMethod, formPaymentDate]);

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
      !isSectionFourValid
    ) {
      // raise a toast to the user
      return;
    }
    setActiveStep(4);
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
      default:
        return true;
    }
  }

  function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (activeStep === 2) {
      setFireFeeCalc(true);
      setActiveStep(activeStep + 1);
      return;
    }
    if (activeStep === 3) {
      handleSubmit(e);
      return;
    }
    setActiveStep(activeStep + 1);
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
      <PageHeader title="New Booking" />

      <div id="new-booking-stepper-container">
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
      </div>

      {/* Form container wrapper gives form a max-width */}

      <div id="new-booking-content-container" ref={contentRef}>
        <form id="new-booking-form" onSubmit={(e) => e.preventDefault()}>
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
              searchFieldResults={existingGuestSearchResultsData && existingGuestSearchResultsData.data}
            />
          )}

          {/* EQUIPMENT DETAILS */}

          {activeStep === 1 && (
            <EquipmentDetails
              equipmentTypes={selectedSite?.equipmentTypes as EquipmentType[]}
              formEquipmentType={formEquipmentType}
              setFormEquipmentType={setFormEquipmentType}
              extraTypes={extraTypesData!.data}
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
              availableUnitsAreLoading={availableUnitsAreLoading}
              availableUnits={availableUnitsData && availableUnitsData.data}
              dateError={dateError}
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

          {activeStep === 3 && bookingFee === null && (
            <Box
              sx={{ mb: 3 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="body1">
                Please wait while we calculate the booking fee...
              </Typography>
            </Box>
          )}

          {activeStep === 3 && bookingFee !== null && (
            <PaymentDetails
              bookingFee={bookingFee}
              formPaymentAmount={formPaymentAmount}
              setFormPaymentAmount={setFormPaymentAmount}
              formPaymentMethod={formPaymentMethod}
              setFormPaymentMethod={setFormPaymentMethod}
              formPaymentDate={formPaymentDate}
              setFormPaymentDate={setFormPaymentDate}
            />
          )}

          {/* MAKING YOUR BOOKING */}

          {activeStep === 4 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1">
                Please wait while we make your booking...
              </Typography>
            </Box>
          )}

          {/* BOOKING COMPLETE */}

          {activeStep === 5 && <BookingConfirmation bookingId={bookingId} />}
        </form>
      </div>

      <div id="new-booking-error-container">
        {createBookingError && (
          <Alert severity="error">{createBookingError}</Alert>
        )}
      </div>

      {/* STEP CONTROL BUTTONS */}

      <div id="new-booking-controls-container">
        {activeStep < 4 && (
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
              onClick={(e) => handleNextButtonClick(e)}
              disabled={isNextButtonDisabled()}
            >
              {activeStep <= 2 ? "Next" : "Complete Booking"}
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
};

export default NewBooking;
