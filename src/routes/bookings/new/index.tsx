import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import LeadGuestDetails from "../../../components/NewBookingForm/LeadGuestDetails";
import EquipmentDetails from "../../../components/NewBookingForm/EquipmentDetails";
import BookingDetails from "../../../components/NewBookingForm/BookingDetails";
import OccupantDetails from "../../../components/NewBookingForm/OccupantDetails";
import PaymentDetails from "../../../components/NewBookingForm/PaymentDetails";
import AuthContext from "../../../contexts/authContext";
import {
  BookingProcessGuest,
  BookingProcessPet,
  BookingProcessVehicle,
  EquipmentType,
  ExtraType,
  GuestType,
} from "../../../types";
import { getExtraTypesBySiteId } from "../../../services/queries/getExtraTypes";
import { useQuery } from "react-query";
import useWindowDimensions from "../../../hooks/useWindowDimension";

const steps = [
  "Lead Guest Details",
  "Equipment Details",
  "Booking Details",
  "Occupant Details",
  "Payment Details",
];

const NewBooking = () => {
  // -------------
  // CONTEXT
  // -------------

  const { user, selectedSite } = useContext(AuthContext);

  // -------------
  // STATE
  // -------------

  const [activeStep, setActiveStep] = useState<number>(0);

  const [formGuestType, setFormGuestType] = useState<"new" | "existing">("new");
  const [formGuestId, setFormGuestId] = useState<number | null>(null);
  const [formGuestFirstName, setFormGuestFirstName] = useState<string>("");
  const [formGuestLastName, setFormGuestLastName] = useState<string>("");
  const [formGuestEmail, setFormGuestEmail] = useState<string>("");
  const [formGuestPhone, setFormGuestPhone] = useState<string>("");
  const [formGuestAddress1, setFormGuestAddress1] = useState<string>("");
  const [formGuestAddress2, setFormGuestAddress2] = useState<string>("");
  const [formGuestCity, setFormGuestCity] = useState<string>("");
  const [formGuestCounty, setFormGuestCounty] = useState<string>("");
  const [formGuestPostcode, setFormGuestPostcode] = useState<string>("");

  const [formEquipmentType, setFormEquipmentType] = useState<number>(-1);
  const [formExtras, setFormExtras] = useState<number[]>([]);

  const [formBookingGuests, setFormBookingGuests] = useState<
    BookingProcessGuest[]
  >([]);
  const [formBookingPets, setFormBookingPets] = useState<BookingProcessPet[]>(
    []
  );
  const [formBookingVehicles, setFormBookingVehicles] = useState<
    BookingProcessVehicle[]
  >([]);

  const [formUnitId, setFormUnitId] = useState<number | null>();
  const [formUnitName, setFormUnitName] = useState<string>("");
  const [formUnitTypeId, setFormUnitTypeId] = useState<number | null>(null);
  const [formStartDate, setFormStartDate] = useState<Date | null>(null);
  const [formEndDate, setFormEndDate] = useState<Date | null>(null);
  const [formNumberOfNights, setFormNumberOfNights] = useState<number | null>(
    null
  );

  const [formPaymentMethod, setFormPaymentMethod] = useState<string>("");
  const [formPaymentAmount, setFormPaymentAmount] = useState<number | null>(
    null
  );

  const [guestSearchData, setGuestSearchData] = useState<any | null>([
    "hello",
    "world",
  ]);

  // -------------
  // HOOKS
  // -------------

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const {width} = useWindowDimensions();
  const unitId = searchParams.get("unitId");
  const start = searchParams.get("start");

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
  // EVENT HANDLERS
  // -------------

  function handleCallBackFromGuestSearchField(value: string) {
    console.log(value);
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
    <form id="new-booking">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Create New Booking
      </Typography>

      {/* TITLE on mobile screens */}

      {width <= 468 && (
        <Box sx={{ width: "100%", mb: 4 }}>
          <Typography sx={{ mb: 3 }} variant="h6" gutterBottom>
            {steps[activeStep]}
          </Typography>
        </Box>
      )}

      {/* STEPPER on wider screens */}

      {width > 468 && (
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

      {/* LEAD GUEST DETAILS */}

      {activeStep === 0 && (
        <LeadGuestDetails
          formGuestType={formGuestType}
          setFormGuestType={setFormGuestType}
          formGuestFirstName={formGuestFirstName}
          setFormGuestFirstName={setFormGuestFirstName}
          formGuestLastName={formGuestLastName}
          setFormGuestLastName={setFormGuestLastName}
          formGuestEmail={formGuestEmail}
          setFormGuestEmail={setFormGuestEmail}
          formGuestPhone={formGuestPhone}
          setFormGuestPhone={setFormGuestPhone}
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
          callbackFromSearchField={handleCallBackFromGuestSearchField}
          searchFieldResults={guestSearchData}
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

      {activeStep === 2 && <BookingDetails />}

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

      {activeStep === 4 && <PaymentDetails />}

      {/* STEP CONTROL BUTTONS */}

      <Box width="100%" display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

export default NewBooking;
