import React, { useState } from "react";

export const usePaymentDetailsState = () => {
  const [formPaymentAmount, setFormPaymentAmount] = useState<number | null>(
    null
  );
  const [formPaymentMethod, setFormPaymentMethod] = useState<string>("");
  const [formPaymentDate, setFormPaymentDate] = useState<Date | null>(
    new Date()
  );

  return {
    formPaymentAmount,
    setFormPaymentAmount,
    formPaymentMethod,
    setFormPaymentMethod,
    formPaymentDate,
    setFormPaymentDate,
  };
};
