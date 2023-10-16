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

}

const LargeButton = ({children, onClick, highlighted}: LargeButtonProps) => {
    return (
        <Button variant={highlighted ? "contained" : "outlined"} onClick={onClick}>
            {children}
        </Button>
    );
}

export default LargeButton;