import { Nav } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { authenticationService } from "../auth/AuthService";

interface IUserIcon {
    navItem?: boolean
}

function UserIcon(props: IUserIcon) {
    if (authenticationService.currentUserValue && props.navItem)
        return (
            <Nav.Link href="/profile">
                <strong><BiUserCircle /> {authenticationService.currentUserValue.userName}</strong>
            </Nav.Link>
        );
    else if (authenticationService.currentUserValue && !props.navItem)
        return (
            <strong><BiUserCircle /> {authenticationService.currentUserValue.userName}</strong>
        );
    else if (!authenticationService.currentUserValue && props.navItem)
        return (
            <Nav.Link href="/login">
                <strong>Login</strong>
            </Nav.Link>
        );

    return (
        <strong>Login</strong>
    );
}

export default UserIcon;