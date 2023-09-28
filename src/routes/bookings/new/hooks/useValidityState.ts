import React, { useState } from 'react';

export const useValidityState = () => {
    const [isSectionOneValid, setIsSectionOneValid] = useState<boolean>(false);
    const [isSectionTwoValid, setIsSectionTwoValid] = useState<boolean>(false);
    const [isSectionThreeValid, setIsSectionThreeValid] =
      useState<boolean>(false);
    const [isSectionFourValid, setIsSectionFourValid] = useState<boolean>(false);
    const [isSectionFiveValid, setIsSectionFiveValid] = useState<boolean>(true); // for now, lets allow a booking to be made without a payment

    return {
        isSectionOneValid,
        setIsSectionOneValid,
        isSectionTwoValid,
        setIsSectionTwoValid,
        isSectionThreeValid,
        setIsSectionThreeValid,
        isSectionFourValid,
        setIsSectionFourValid,
        isSectionFiveValid,
        setIsSectionFiveValid,
    }
}