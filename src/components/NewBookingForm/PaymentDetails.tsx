import React from "react";
import { Box, Typography } from "@mui/material";

const PaymentDetails = () => {
  return (
    <Box id="payment-details">
      <Typography sx={{ mb: 3 }} variant="h5" gutterBottom>
        Payment Details
      </Typography>
    </Box>
  );
};

export default PaymentDetails;
