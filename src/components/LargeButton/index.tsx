import { Button } from "@mui/material";
import React, { ReactNode } from "react";

type LargeButtonProps = {
    /** mandatory, button text */
    children: ReactNode,
    /** mandatory, callback triggered on button click */
    onClick: () => void
    /** mandatory, highlighted state */
    highlighted: boolean
    /** optional, class name */
    className?: string
    /** optional, disabled state */
    disabled?: boolean
}

const LargeButton = ({children, onClick, highlighted, disabled = false}: LargeButtonProps) => {
    return (
        <Button variant={highlighted ? "contained" : "outlined"} onClick={onClick} disabled={disabled}>
            {children}
        </Button>
    );
}

export default LargeButton;