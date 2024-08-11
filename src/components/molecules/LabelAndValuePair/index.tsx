import React, { ReactNode } from "react";

import "./style.css";

type LabelAndValuePairProps = {
    label: string;
    value: string | number | boolean | ReactNode;
    valueColor?: string;
};

const LabelAndValuePair = ({ label, value, valueColor }: LabelAndValuePairProps) => {
  return (
    <div className="label-and-value-pair">
      <div className="label">{label}</div>
      <div className="value" style={{
        color: valueColor
      }}>{value}</div>
    </div>
  );
}

export default LabelAndValuePair;