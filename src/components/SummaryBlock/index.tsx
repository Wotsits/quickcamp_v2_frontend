import React from "react";
import "./style.css";

type SummaryBlockProps = {
  /** mandatory, label to appear in summary block */
  label: string;
  /** mandatory, content to appear in summary block */
  content: string | number;
  /** mandatory, background setting string of summary block */
  background: string;
  /** mandatory, foreground color of summary block */
  foregroundColor: string;
  /** mandatory, summaryBlock width */
  width: string;
  /** mandatory, summaryBlock height */
  height: string;
};

const SummaryBlock = ({
  label,
  content,
  background,
  foregroundColor,
  width,
  height,
}: SummaryBlockProps) => {
  return (
    <div
      className="summary-block"
      style={{ background, color: foregroundColor, width, minWidth: width, height, minHeight: height }}
    >
      <div className="summary-block-label">{label}</div>
      <div className="summary-block-content">{content}</div>
    </div>
  );
};

export default SummaryBlock;