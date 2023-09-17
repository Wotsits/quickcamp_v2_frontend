import React from "react";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

type ColumnWidthControlsComponentProps = {
  /** mandatory, current column width */
  columnWidth: number;
  /** mandatory, function to set column width */
  setColumnWidth: (columnWidth: number) => void;
};

const ColumnWidthControls = ({
  columnWidth,
  setColumnWidth,
}: ColumnWidthControlsComponentProps) => {
  return (
    <div id="column-width-controls" className="column-width-controls">
      <ZoomInIcon onClick={() => setColumnWidth(columnWidth + 10)} fontSize="large" color="secondary"/>
      <ZoomOutIcon onClick={() => setColumnWidth(columnWidth - 10)} fontSize="large" color="secondary"/>
    </div>
  );
};

export default ColumnWidthControls;
