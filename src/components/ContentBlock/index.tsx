import React from 'react';
import { Typography } from '@mui/material';

import './style.css';

type ContentBlockProps = {
    /** mandatory, content block title */
    title: string;
    /** optional, component for top right of the content block header */
    topRightComponent?: React.ReactNode;
    /** mandatory, content block children */
    children: React.ReactNode | React.ReactNode[];
}

const ContentBlock = ({title, topRightComponent, children}: ContentBlockProps) => {
    return (
        <div className="content-block">
            <div className="content-block-header">
                <Typography variant="h5" component="h2" gutterBottom>
                    {title}
                </Typography>
                {topRightComponent}
            </div>
            {children}
        </div>
    )
}

export default ContentBlock;