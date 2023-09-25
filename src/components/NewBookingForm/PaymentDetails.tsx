import React from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import LargeButton from "../LargeButton";

const paymentMethods = [
  "cash",
  "card",
  "bank transfer",
]

const PaymentDetails = () => {
  const [paymentMethod, setPaymentMethod] = React.useState("cash");

  return (
    <Box id="payment-details" sx={{mb: 3}}>
      <TextField
        fullWidth
        label="Amount Paid"
        sx={{ mb: 2 }}
        type="number"
      />
      <div id="payment-method-button-container">
        {paymentMethods.map((paymentMethodType) => {
          return (
            <LargeButton
              key={paymentMethodType}
              onClick={() => setPaymentMethod(paymentMethodType)}
              highlighted={paymentMethodType === paymentMethod}
            >
              <Typography variant="body1">{paymentMethodType}</Typography>
            </LargeButton>
          );
        })}
      </div>
      <DatePicker
        label="Payment Date"
        sx={{ mb: 2, width: "100%"}}
        defaultValue={new Date()}
      />
    </Box>
  );
};

export default PaymentDetails;
