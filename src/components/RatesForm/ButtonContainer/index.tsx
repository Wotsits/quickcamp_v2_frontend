import React from 'react'

import { Button } from '@mui/material'

type ButtonContainerProps = {
    config: {
        onClick: () => void;
        disabled: boolean;
        variant: "text" | "outlined" | "contained";
        color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
        text: string;
    }[]
    validOverride?: boolean;
}
const ButtonContainer = ({config, validOverride}: ButtonContainerProps) => {
    return (
        <div className={"button-container container-flex-row-space-between-center-full-width margin-top-1"}>
            {config.map((button, index) => {
                return (
                    <Button
                        key={index}
                        onClick={button.onClick}
                        disabled={!validOverride && button.disabled}
                        variant={button.variant}
                        color={button.color}
                    >
                        {button.text}
                    </Button>
                )
            })}
        </div>
    )
}

export default ButtonContainer