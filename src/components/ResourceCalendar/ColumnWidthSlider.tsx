import React from "react";

type ColumnWidthSliderComponentProps = {
  /** mandatory, current column width */
  columnWidth: number;
  /** mandatory, function to set column width */
  setColumnWidth: (columnWidth: number) => void;
};

const ColumnWidthSlider = ({
  columnWidth,
  setColumnWidth,
}: ColumnWidthSliderComponentProps) => {
  return (
    <div id="column-width-slider" className="column-width-slider">
      <span>Column Width: </span>
      <input
        type="range"
        min={30}
        max={250}
        value={columnWidth}
        onChange={(e) => setColumnWidth(parseInt(e.target.value))}
      />
    </div>
  );
};

export default ColumnWidthSlider;
