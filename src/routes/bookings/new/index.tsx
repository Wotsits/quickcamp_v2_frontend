import {
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './style.css'
import LeadGuestDetails from "../../../components/NewBookingForm/LeadGuestDetails";
import EquipmentDetails from "../../../components/NewBookingForm/EquipmentDetails";
import BookingDetails from "../../../components/NewBookingForm/BookingDetails";
import OccupantDetails from "../../../components/NewBookingForm/OccupantDetails";
import PaymentDetails from "../../../components/NewBookingForm/PaymentDetails";

const NewBooking = () => {
  // -------------
  // STATE
  // -------------

  const [formGuestType, setFormGuestType] = useState<"new" | "existing">("new");
  const [formGuestId, setFormGuestId] = useState<number | null>(null);
  const [formGuestFirstName, setFormGuestFirstName] = useState<string>(
    ""
  );
  const [formGuestLastName, setFormGuestLastName] = useState<string>(
    ""
  );
  const [formGuestEmail, setFormGuestEmail] = useState<string>("");
  const [formGuestPhone, setFormGuestPhone] = useState<string>("");
  const [formGuestAddress1, setFormGuestAddress1] = useState<string>(
    ""
  );
  const [formGuestAddress2, setFormGuestAddress2] = useState<string>(
    ""
  );
  const [formGuestCity, setFormGuestCity] = useState<string>("");
  const [formGuestCounty, setFormGuestCounty] = useState<string>("");
  const [formGuestPostcode, setFormGuestPostcode] = useState<string>(
    ""
  );

  const [formEquipmentType, setFormEquipmentType] = useState<string>(
    ""
  );
  const [formEquipmentEhu, setFormEquipmentEhu] = useState<boolean>(
    false
  );
  const [formUnitId, setFormUnitId] = useState<number | null>();
  const [formUnitName, setFormUnitName] = useState<string>("");
  const [formUnitTypeId, setFormUnitTypeId] = useState<number | null>(null);
  const [formStartDate, setFormStartDate] = useState<Date | null>(null);
  const [formEndDate, setFormEndDate] = useState<Date | null>(null);
  const [formNumberOfNights, setFormNumberOfNights] = useState<number | null>(
    null
  );

  const [formPaymentMethod, setFormPaymentMethod] = useState<string>(
    ""
  );
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
  const unitId = searchParams.get("unitId");
  const start = searchParams.get("start");

  // -------------
  // EVENT HANDLERS
  // -------------

  function handleCallBackFromGuestSearchField(value: string) {
    console.log(value);
  }

  // -------------
  // RENDER
  // -------------

  return (
    <form id="new-booking">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Create New Booking
      </Typography>

      {/* LEAD GUEST DETAILS */}

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
      
      {/* EQUIPMENT DETAILS */}

      <EquipmentDetails formEquipmentType={formEquipmentType} setFormEquipmentType={setFormEquipmentType} formEquipmentEhu={formEquipmentEhu} setFormEquipmentEhu={setFormEquipmentEhu} />
      
      {/* BOOKING DETAILS */}

      <BookingDetails />

      {/* OCCUPANT DETAILS */}

      <OccupantDetails />

      {/* PAYMENT DETAILS */}

      <PaymentDetails />
    </form>
  );
};

export default NewBooking;
