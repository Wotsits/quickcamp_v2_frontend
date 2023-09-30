import React, { useState } from 'react';

type BookingDetailsStateHookArgs = {
    requestedUnitId: number | null;
    requestedStartDate: Date | null;
}

export const useBookingDetailsState = ({ requestedUnitId, requestedStartDate }: BookingDetailsStateHookArgs) => {
    const [formUnitId, setFormUnitId] = useState<number | null>(requestedUnitId);
    const [formStartDate, setFormStartDate] = useState<Date | null>(new Date(requestedStartDate || new Date()));
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