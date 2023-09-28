import React, { useState } from 'react';

export const useEquipmentDetailsState = () => {
    const [formEquipmentType, setFormEquipmentType] = useState<number>(-1);
    const [formExtras, setFormExtras] = useState<number[]>([]);

    return {
        formEquipmentType,
        setFormEquipmentType,
        formExtras,
        setFormExtras,
    }
}