import React, { useEffect, useState } from 'react';
import addDays from 'date-fns/addDays';

type BookingDetailsStateHookArgs = {
    requestedUnitId: number | null;
    requestedUnitTypeId: number | null;
    requestedStartDate: Date | null;
}

export const useBookingDetailsState = ({ requestedUnitId, requestedStartDate, requestedUnitTypeId }: BookingDetailsStateHookArgs) => {
    const [formUnitId, setFormUnitId] = useState<number | null>(requestedUnitId);
    const [formUnitTypeId, setFormUnitTypeId] = useState<number | null>(requestedUnitTypeId);
    const [formStartDate, setFormStartDate] = useState<Date | null>(new Date(requestedStartDate || new Date()));
    const [formEndDate, setFormEndDate] = useState<Date | null>(addDays(new Date(requestedStartDate || new Date()), 1));
    const [dateError, setDateError] = useState<string | null>(null);

    useEffect(() => {
        if (formStartDate && formEndDate && formStartDate >= formEndDate) {
            setDateError('End date must be after start date');
        }
        else {
            setDateError(null);
        }
    }, [formStartDate, formEndDate]);

    return {
        formUnitId,
        setFormUnitId,
        formUnitTypeId,
        setFormUnitTypeId,
        formStartDate,
        setFormStartDate,
        formEndDate,
        setFormEndDate,
        dateError,
    }
}