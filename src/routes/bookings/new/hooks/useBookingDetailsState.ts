import React, { useState } from 'react';

export const useBookingDetailsState = () => {
    const [formUnitId, setFormUnitId] = useState<number | null>(null);
    const [formStartDate, setFormStartDate] = useState<Date | null>(null);
    const [formEndDate, setFormEndDate] = useState<Date | null>(null);

    return {
        formUnitId,
        setFormUnitId,
        formStartDate,
        setFormStartDate,
        formEndDate,
        setFormEndDate,
    }
}