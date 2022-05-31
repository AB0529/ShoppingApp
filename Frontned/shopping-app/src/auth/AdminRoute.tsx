import { Navigate, Outlet } from 'react-router-dom';
import config from '../config/config';
import { useStickyState } from '../state/stickyState';

export const AdminRoute = () => {
    const [user, setUser] = useStickyState(null, 'user');

    // Not authorized
    if (!user || config.adminIDs.indexOf(user.userID) == -1 ) {
        console.log("Not auth");
        return <Navigate to="/login" />
    }

    return <Outlet />;
}