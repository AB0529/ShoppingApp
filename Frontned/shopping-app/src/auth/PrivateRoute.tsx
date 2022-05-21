import { Navigate, Outlet } from 'react-router-dom';
import { authenticationService } from './AuthService';


export const PrivateRoute = () => {
    const currentUser = authenticationService.currentUserValue;

    // Not authorized
    if (!currentUser) {
        console.log("Not auth");
        return <Navigate to="/login" />
    }

    return <Outlet />;
}