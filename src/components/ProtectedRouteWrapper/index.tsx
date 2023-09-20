import React, { ReactNode, useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../settings';

type ProtectedRouteWrapperProps = {
    children: ReactNode;
    };

const ProtectedRouteWrapper = ({children}: ProtectedRouteWrapperProps) => {
    const {user} = useContext(AuthContext);
    
    if (!user) {
        return <Navigate to={ROUTES.LOGIN} replace={true} />
    }

    return <div>{children}</div>
}

export default ProtectedRouteWrapper;