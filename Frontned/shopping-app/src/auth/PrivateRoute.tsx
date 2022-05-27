import { Navigate, Outlet } from 'react-router-dom';
import { useStickyState } from '../state/stickyState';

export const PrivateRoute = () => {
    const [user, setUser] = useStickyState(null, 'user');

    // Not authorized
    if (!user) {
        console.log("Not auth");
        return <Navigate to="/login" />
    }

    return <Outlet />;
}