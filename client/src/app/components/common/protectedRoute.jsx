import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ component: Component, children, ...props }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <Navigate
                to={{
                    pathname: '/login',
                    state: {
                        from: props.location,
                    },
                }}
            />
        );
    }

    return (
        // <Routes>
        //     <Route
        //         {...rest}
        //         render={props => {
        //             if (!currentUser) {
        //                 return <Navigate to="/login" />;
        //             }
        //             return Component ? <Component {...props} /> : children;
        //         }}
        //     />
        // </Routes>

        <>{Component ? <Component {...props} /> : children}</>
    );
};

export default ProtectedRoute;
