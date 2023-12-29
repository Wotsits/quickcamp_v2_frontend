import { Typography } from "@mui/material";
import React from "react";
import "./style.css";

type PageHeaderProps = {
  title: string;
  subTitle?: string;
  children?: React.ReactNode | React.ReactNode[];
};

const PageHeader = ({ title, subTitle, children }: PageHeaderProps) => {
  return (
    <div id="page-header" className="page-header">
      <div className="page-header-right">
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {subTitle && (
          <Typography variant="h6" gutterBottom>
            {subTitle}
          </Typography>
        )}
      </div>
      <div className="page-header-left">{children}</div>
    </div>
  );
};

export default PageHeader;
