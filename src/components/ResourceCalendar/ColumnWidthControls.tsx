import React from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { IconButton } from "@mui/material";

type ColumnWidthControlsComponentProps = {
  /** mandatory, current column width */
  columnWidth: number;
  /** mandatory, function to set column width */
  setColumnWidth: (columnWidth: number) => void;
  /** mandatory, min width of booking calendar column width */
  minWidth: number;
};

const ColumnWidthControls = ({
  columnWidth,
  setColumnWidth,
  minWidth,
}: ColumnWidthControlsComponentProps) => {
  return (
    <div id="column-width-controls" className="column-width-controls">
      <IconButton          
        onClick={() => setColumnWidth(columnWidth + 10)}>
        <ZoomInIcon
          fontSize="large"
          color="secondary"
        />
      </IconButton>
      <IconButton onClick={() => setColumnWidth(columnWidth - 10)} disabled={columnWidth === minWidth}>
        <ZoomOutIcon
          fontSize="large"
          color="secondary"
        />
      </IconButton>
    </div>
  );
};

export default ColumnWidthControls;
