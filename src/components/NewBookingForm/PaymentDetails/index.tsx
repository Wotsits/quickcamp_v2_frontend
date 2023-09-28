import React from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import LargeButton from "../../LargeButton";
import "./style.css";

type PaymentDetailsProps = {
  formPaymentAmount: number | null;
  setFormPaymentAmount: React.Dispatch<React.SetStateAction<number | null>>;
  formPaymentMethod: string;
  setFormPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  formPaymentDate: Date | null;
  setFormPaymentDate: React.Dispatch<React.SetStateAction<Date | null>>;
};


const paymentMethods = [
  "cash",
  "card",
  "bank transfer",
]

const PaymentDetails = ({formPaymentAmount, setFormPaymentAmount, formPaymentMethod, setFormPaymentMethod, formPaymentDate, setFormPaymentDate}: PaymentDetailsProps) => {

  return (
    <Box id="payment-details" sx={{mb: 3}}>
      <TextField
        fullWidth
        label="Amount Paid"
        sx={{ mb: 2 }}
        type="number"
        value={formPaymentAmount}
        onChange={(e) => setFormPaymentAmount(parseFloat(e.target.value))}
      />
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
        sx={{ mb: 2, width: "100%"}}
        value={formPaymentDate}
        onChange={(date) => setFormPaymentDate(date)}
      />
    </Box>
  );
};

export default PaymentDetails;
