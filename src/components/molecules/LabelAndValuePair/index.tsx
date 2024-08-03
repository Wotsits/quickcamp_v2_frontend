import React, { ReactNode } from "react";

import "./style.css";

type LabelAndValuePairProps = {
    label: string;
    value: string | number | boolean | ReactNode;
};

const LabelAndValuePair = ({ label, value }: LabelAndValuePairProps) => {
  return (
    <div className="label-and-value-pair">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}

export default LabelAndValuePair;