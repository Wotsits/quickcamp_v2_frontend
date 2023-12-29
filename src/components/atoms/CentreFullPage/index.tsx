import React, { ReactNode } from 'react';
import './style.css';

type CentreFullPageProps = {
    children: ReactNode;
}

const CentreFullPage = ({children}: CentreFullPageProps) => {

    return (
        <div id="centre-full-page" className="centre-full-page">
            {children}
        </div>
    );
}

export default CentreFullPage;