import React, { useState } from 'react';

export const useValidityState = () => {
    const [isSectionOneValid, setIsSectionOneValid] = useState<boolean>(false);
    const [isSectionTwoValid, setIsSectionTwoValid] = useState<boolean>(false);
    const [isSectionThreeValid, setIsSectionThreeValid] =
      useState<boolean>(false);
    const [isSectionFourValid, setIsSectionFourValid] = useState<boolean>(false);

    return {
        isSectionOneValid,
        setIsSectionOneValid,
        isSectionTwoValid,
        setIsSectionTwoValid,
        isSectionThreeValid,
        setIsSectionThreeValid,
        isSectionFourValid,
        setIsSectionFourValid,
    }
}