import { Button, Nav } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { authenticationService } from "../auth/AuthService";

interface IUserIcon {
    navItem?: boolean
}

function UserIcon(props: IUserIcon) {
    const navUserIcon = (
        <Nav.Link href="/profile">
            <strong><BiUserCircle /> {authenticationService.currentUserValue}</strong>
        </Nav.Link>
    );
    const navLogin = (
        <Nav.Link href="/login">
            <strong>Login</strong>
        </Nav.Link>
    )
    const userIcon = (
        <strong><BiUserCircle /> {authenticationService.currentUserValue}</strong>
    );
    const login = (
        <strong>Login</strong>
    );

    if (authenticationService.currentUserValue && props.navItem)
        return navUserIcon;
    else if (authenticationService.currentUserValue && !props.navItem)
        return userIcon;
    else if (!authenticationService.currentUserValue && props.navItem)
        return navLogin;

    return login;
}

export default UserIcon;