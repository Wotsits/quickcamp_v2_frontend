import React from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import LargeButton from "../../../atoms/LargeButton";
import "./style.css";

type PaymentDetailsProps = {
  bookingFee: number;
  formPaymentAmount: number | null;
  setFormPaymentAmount: React.Dispatch<React.SetStateAction<number | null>>;
  formPaymentMethod: string | null;
  setFormPaymentMethod: React.Dispatch<React.SetStateAction<string | null>>;
  formPaymentDate: Date | null;
  setFormPaymentDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const paymentMethods = ["CASH", "CARD", "BANK TRANSFER"];

const PaymentDetails = ({
  bookingFee,
  formPaymentAmount,
  setFormPaymentAmount,
  formPaymentMethod,
  setFormPaymentMethod,
  formPaymentDate,
  setFormPaymentDate,
}: PaymentDetailsProps) => {
  const [fullPayment, setFullPayment] = React.useState<boolean>(true);

  return (
    <Box id="payment-details" sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Booking Fee"
        InputProps={{
          startAdornment: <InputAdornment position="start">£</InputAdornment>,
        }}
        sx={{ mb: 2 }}
        type="number"
        value={bookingFee}
        disabled
      />
      <Box id="full-part-payment-button-container">
        <LargeButton
          onClick={() => {
            setFormPaymentAmount(bookingFee);
            setFullPayment(true);
          }}
          highlighted={fullPayment}
        >
          <Typography variant="body1">Full Payment</Typography>
        </LargeButton>
        <LargeButton
          onClick={() => setFullPayment(false)}
          highlighted={!fullPayment}
        >
          <Typography variant="body1">Part Payment</Typography>
        </LargeButton>
      </Box>
      {!fullPayment && (
        <TextField
          fullWidth
          label="Amount Paid"
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
          sx={{ mb: 2 }}
          type="number"
          value={formPaymentAmount}
          onChange={(e) => setFormPaymentAmount(parseFloat(e.target.value))}
        />
      )}
      <div id="payment-method-button-container">
        {paymentMethods.map((paymentMethodType) => {
          return (
            <LargeButton
              key={paymentMethodType}
              onClick={() => setFormPaymentMethod(paymentMethodType)}
              highlighted={formPaymentMethod === paymentMethodType}
            >
              <Typography variant="body1">{paymentMethodType}</Typography>
            </LargeButton>
          );
        })}
      </div>
      <DatePicker
        label="Payment Date"
        sx={{ mb: 2, width: "100%" }}
        value={formPaymentDate}
        onChange={(date) => setFormPaymentDate(date)}
      />
    </Box>
  );
};

export default PaymentDetails;
