import { AddCircleOutlineOutlined, Person2Outlined, RemoveCircleOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import './style.css';

type AddRemoveProps = {
    /** The content of the component. */
    children: React.ReactNode;
    /** Callback function to be called when the minus button is clicked. */
    callbackOnMinus: () => void;
    /** Callback function to be called when the plus button is clicked */
    callbackOnPlus: () => void;
}

const AddRemove = ({children, callbackOnMinus, callbackOnPlus}: AddRemoveProps) => {
    return (
        <div className="add-remove">
            <IconButton onClick={callbackOnMinus}>
                <RemoveCircleOutline/>
            </IconButton>
            <IconButton>
                {children}
            </IconButton>
            <IconButton onClick={callbackOnPlus}>
                <AddCircleOutlineOutlined />
            </IconButton>
        </div>
    );
}

export default AddRemove;