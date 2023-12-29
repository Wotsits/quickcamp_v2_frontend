import {
  AddCircleOutlineOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import "./style.css";

type AddRemoveProps = {
  /** Mandatory, the content of the component. */
  children: React.ReactNode;
  /** Mandatory, callback function to be called when the minus button is clicked. */
  callbackOnMinus: () => void;
  /** Mandatory, callback function to be called when the plus button is clicked */
  callbackOnPlus: () => void;
  /** Mandatory, current value to display */
  value: number;
};

const AddRemove = ({
  children,
  callbackOnMinus,
  callbackOnPlus,
  value,
}: AddRemoveProps) => {
  return (
    <div className="add-remove">
      <div className="child-holder">
        <IconButton>{children}</IconButton>
      </div>
      <div className="control-holder">
        <IconButton onClick={callbackOnMinus}>
          <RemoveCircleOutline />
        </IconButton>
        <span>{value.toString()}</span>
        <IconButton onClick={callbackOnPlus}>
          <AddCircleOutlineOutlined />
        </IconButton>
      </div>
    </div>
  );
};

export default AddRemove;
