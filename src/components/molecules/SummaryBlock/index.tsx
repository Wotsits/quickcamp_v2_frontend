import React from "react";
import "./style.css";

type SummaryBlockProps = {
  /** mandatory, label to appear in summary block */
  label: string;
  /** mandatory, content to appear in summary block */
  content: string | number;
  /** optional, text for a subLabel rendered if provided */
  subLabel?: string;
  /** mandatory, background setting string of summary block */
  background: string;
  /** mandatory, foreground color of summary block */
  foregroundColor: string;
  /** optional, summaryBlock width */
  width?: string;
  /** optional, summaryBlock height */
  height?: string;
  /** optional, summmaryBlock minWidth */
  minWidth?: string;
  /** optional, summaryBlock maxWidth */
  maxWidth?: string;
  /** optional, summaryBlock minHeight */
  minHeight?: string;
  /** optional, summaryBlock maxHeight */
  maxHeight?: string;
  /** optional, function to call onClick */
  onClick?: () => void
};

const SummaryBlock = ({
  label,
  content,
  subLabel,
  background,
  foregroundColor,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  onClick
}: SummaryBlockProps) => {
  return (
    <div
      className="summary-block"
      style={{
        background: background,
        color: foregroundColor,
        width: width,
        minWidth: minWidth,
        maxWidth: maxWidth,        
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight,
        flex: 1,
        cursor: onClick ? "pointer" : "auto"
      }}
      onClick={onClick}
    >
      <h6 className="summary-block-label">{label}</h6>
      <div className="summary-block-content-container">{content}</div>
      {subLabel && <h6 className="summary-block-sublabel">{subLabel}</h6>}
    </div>
  );
};

export default SummaryBlock;
